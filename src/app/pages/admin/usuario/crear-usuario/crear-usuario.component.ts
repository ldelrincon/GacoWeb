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
    FlexLayoutModule
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
  public usuarioForm: FormGroup = this.formBuild.group({
    idCatTipoUsuario: [null, Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(8)]],
    confirmar_contrasena: ['', [Validators.required, Validators.minLength(8)]],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
  },
    { validators: [this.checkPasswords] }
  );

  // Datos de tipos de usuario
  tiposUsuario = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Cliente' },
  ];

  constructor(private route: ActivatedRoute, private swalLoading: LoadingService) { }

  ngOnInit(): void {
    // Obtener el ID de usuario de la ruta, si es necesario
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      console.log('ID de usuario:', userId);
      // Aquí puedes hacer una llamada a un servicio para cargar los datos del usuario
    }
  }

  // Método para manejar el submit del formulario
  onSubmit(): void {
    let titulo: string = "Guardar usuario";
    try {
      this.swalLoading.showLoading(titulo);
      // Guardar usuario.
      if (this.usuarioForm.valid) {
        console.log('Formulario válido:', this.usuarioForm.value);
        // Aquí puedes agregar la lógica para enviar los datos a la API

        this.swalLoading.close();
        this.swalLoading.showSuccess(titulo, "Usuario guardado correctamente");
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
