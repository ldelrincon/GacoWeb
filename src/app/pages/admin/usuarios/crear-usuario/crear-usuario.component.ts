import { CatTipoUsuarioResponse } from '../../../../models/responses/catalogos/CatTipoUsuarioResponse';
import { CatalogosService } from '../../../../services/catalogos.service';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingService } from '../../../../services/loading.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { UsuarioRequest } from '../../../../models/requests/UsuarioRequest';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    FlexLayoutModule,
    MatDivider
  ],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  // Inyección de FormBuilder
  public formBuild = inject(FormBuilder);

  checkPasswords: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const contrasena = control.get("contrasena")?.value;
    const confirmarContrasena = control.get("confirmar_contrasena")?.value;

    //Comprobamos unicamente
    return contrasena &&
      confirmarContrasena &&
      contrasena.value !== confirmarContrasena.value
      ? { passwordsMismatch: true }
      : null;
  };

  // Definición del formulario
  public usuarioForm!: FormGroup;
  listaTipoUsuarios: CatTipoUsuarioResponse[] = [];

  constructor(private route: ActivatedRoute, private swalLoading: LoadingService, private catalogos: CatalogosService, private usuario: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuild.group({
      idCatTipoUsuario: [null, Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasena: ['', [Validators.required, Validators.minLength(8)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    },
      { validators: [this.checkPasswords] }
    );

    // Obtener catalogo de tipo usuario.
    this.catalogos.ListaCatTipoUsuarios().subscribe({
      next: (response) => {
        if (response.success) {
          this.listaTipoUsuarios = response.data;
        }
      },
      error: (err) => {
        console.error('Error al cargar tipo de usuarios', err);
      }
    });

    // Obtener el ID de usuario de la ruta, si es necesario
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      console.log('ID de usuario:', userId);
      this.usuario.UsuarioPorId(parseInt(userId)).subscribe({
        next: (response) => {
          if (response.success) {
            this.usuarioForm.patchValue(response.data);
            this.usuarioForm.get('contrasena')?.disable();
            this.usuarioForm.get('confirmarContrasena')?.disable();
          }
        },
        error: (err) => {
          console.error('Error al guardar usuario', err);
        }
      });
    }
  }

  // Método para manejar el submit del formulario
  onSubmit(): void {
    let titulo: string = "Guardar usuario";
    let mensage: string = "Espere un un momento...";
    try {
      this.swalLoading.showLoading(titulo, mensage);
      // Guardar usuario.
      if (this.usuarioForm.valid) {
        console.log('Formulario válido:', this.usuarioForm.value);
        // Aquí puedes agregar la lógica para enviar los datos a la API
        const request: UsuarioRequest = {
          tipoUsuario: this.usuarioForm.value.idCatTipoUsuario,
          nombre: this.usuarioForm.value.nombres,
          correo: this.usuarioForm.value.correo,
          contrasena: this.usuarioForm.value.contrasena,
          confirmarContrasena: this.usuarioForm.value.confirmarContrasena,
          apellidos: this.usuarioForm.value.apellidos,
          telefono: this.usuarioForm.value.telefono,
        };
        // Agregar nuevo usuarios.
        this.usuario.NuevoUsuario(request).subscribe({
          next: (response) => {
            if (response.success) {
              this.usuarioForm.reset();
              this.swalLoading.close();
              this.swalLoading.showSuccess(titulo, "Usuario guardado correctamente");
            }
            else {
              this.swalLoading.close();
              this.swalLoading.showError("Formulario inválido", response.message);
            }
          },
          error: (err) => {
            console.error('Error al guardar usuario', err);
          }
        });
      } else {
        this.usuarioForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar errores
        this.swalLoading.close();
        this.swalLoading.showError(titulo, "Formulario inválido");
      }
    } catch (ex: any) {
      this.swalLoading.close();
      this.swalLoading.showError(`Error: ${titulo}`, ex.message);
    }
  }
}
