import { ActualizarClienteRequest } from './../../../../models/requests/clientes/ActualizarClienteRequest';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CatalogosService } from '../../../../services/catalogos.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LoadingService } from '../../../../services/loading.service';
import { ClienteService } from '../../../../services/cliente.service';
import { NuevoClienteRequest } from '../../../../models/requests/clientes/NuevoClienteRequest';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
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
    MatDivider,
    MatAutocompleteModule,
    FormsModule
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {
  clientesForm!: FormGroup;
  regimenesFiscales: any[] = [];
  municipios: any[] = [];
  estados: any[] = [];

  router = inject(Router);

  constructor(private fb: FormBuilder, private catalogos: CatalogosService, private swalLoading: LoadingService, private clienteService: ClienteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.swalLoading.showLoading();

    this.fnInitForm();
    this.fnGetRegimenesFiscales();
    this.fnGetEstados();

    // Obtener el ID de usuario de la ruta, si es necesario
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      console.log('ID de cliente:', clientId);
      this.clienteService.ClientePorId(parseInt(clientId)).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('data', response.data);
            this.clientesForm.patchValue(response.data);
            console.log('patchValue', this.clientesForm.value);
            this.clientesForm.get('idCatEstado')?.setValue(response.data.efeKey);
            this.fnGetMunicipios(response.data.efeKey);
          }
          this.swalLoading.close();
        },
        error: (err) => {
          console.error('Error al guardar usuario', err.error.message);
          this.swalLoading.close();
        }
      });
    }
  }

  fnInitForm() {
    this.clientesForm = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.maxLength(250)]],
      rfc: [
        '',
        [
          Validators.required,
          Validators.maxLength(13), // Máximo 13 caracteres para RFC estándar
          Validators.pattern(
            '^([A-ZÑ&]{3,4})\\d{6}([A-Z\\d]{3})?$' // RFC formato estándar mexicano
          ),
        ],
      ],
      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$'), // Solo dígitos, exactamente 10
          Validators.maxLength(10), // Refuerzo para no superar 10 caracteres
        ],
      ],
      correo: [
        '',
        [
          Validators.required,
          Validators.email, // Validador nativo de Angular
          Validators.maxLength(300),
        ],
      ],
      direccion: ['', [Validators.required, Validators.maxLength(500)]],
      codigoPostal: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{5}$'), // Código postal mexicano: 5 dígitos
          Validators.maxLength(5), // Máximo 5 dígitos
        ],
      ],
      razonSocial: ['', [Validators.required, Validators.maxLength(300)]],
      codigo: ['', [Validators.required, Validators.maxLength(30)]],
      idRegimenFiscal: [null, [Validators.required]],
      idCatEstado: [null, [Validators.required]],
      idCatMunicipio: [null, [Validators.required]],
      fechaCreacion: [{ value: new Date(), disabled: true }, Validators.required],
      fechaModificacion: [{ value: null, disabled: true }],
      idCatEstatus: [1, [Validators.required]], // Valor por defecto
    });
  }

  onSubmit(): void {
    this.swalLoading.showLoading("Guardar Cliente", "Guardando cliente...");
    try {
      if (this.clientesForm.valid) {
        if (this.clientesForm.value.id) {
          // Actualizar cliente.
          const actualizarRequest: ActualizarClienteRequest = { ...this.clientesForm.value };
          this.clienteService.ActualizarCliente(actualizarRequest).subscribe({
            next: (response) => {
              if (response.success) {
                // this.clientesForm.reset();
                this.swalLoading.close();
                this.swalLoading.showSuccess("Actualizar Cliente", "Cliente guardado correctamente");
              }
              else {
                this.swalLoading.close();
                this.swalLoading.showError("Formulario inválido", response.message);
              }
            },
            error: (err) => {
              this.swalLoading.close();
              this.swalLoading.showError("Actualizar Cliente", err.error.message);
            }
          });
        }
        else {
          // Guardar nuevo cliente.
          const nuevoRequest: NuevoClienteRequest = { ...this.clientesForm.value };
          this.clienteService.NuevoCliente(nuevoRequest).subscribe({
            next: (response) => {
              if (response.success) {
                // this.clientesForm.reset();
                this.swalLoading.close();
                this.swalLoading.showSuccess("Nuevo Cliente", "Cliente guardado correctamente");
                Swal.fire({
                  title: 'Nuevo Cliente',
                  text: 'Cliente guardado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                }).then((result) => {
                  if (result.isConfirmed) {
                    // Redirigir al aceptar
                    this.router.navigate(['/admin/clientes/lista']); // Cambia "/ruta-destino" por la ruta deseada
                  }
                });
              }
              else {
                this.swalLoading.close();
                this.swalLoading.showError("Formulario inválido", response.message);
              }
            },
            error: (err) => {
              this.swalLoading.close();
              this.swalLoading.showError("Guardar Cliente", err.error.message);
            }
          });
        }
      } else {
        // Cerrar cargando.
        this.swalLoading.close();
        this.swalLoading.showError("Guardar Cliente", 'Formulario no válido.');
      }
    }
    catch (ex: any) {
      // Cerrar cargando.
      this.swalLoading.close();
      this.swalLoading.showError("Guardar Cliente", ex.message);
    }
  }

  onCancel(): void {
    this.clientesForm.reset();
  }

  fnGetRegimenesFiscales() {
    this.catalogos.ListaCatRegimenFiscales().subscribe({
      next: (response) => {
        if (response.success) {
          this.regimenesFiscales = response.data;
        }
      },
      error: (err) => {
        console.error('Error al cargar el catalogo', err.error.message);
      }
    });
  }

  fnGetEstados() {
    this.catalogos.ListaCatEstados().subscribe({
      next: (response) => {
        if (response.success) {
          this.estados = response.data;
        }
      },
      error: (err) => {
        console.error('Error al cargar el catalogo', err.error.message);
      }
    });
  }

  onSelectionChangeEstado(event: any): void {
    this.fnGetMunicipios(event.value);
  }

  fnGetMunicipios(valor: string) {
    this.catalogos.ListaCatMunicipio(valor).subscribe({
      next: (response) => {
        if (response.success) {
          this.municipios = response.data;
        }
      },
      error: (err) => {
        console.error('Error al cargar el catalogo', err.error.message);
      }
    });
  }

  get buttonText(): string {
    return this.clientesForm.value.id ? 'Actualizar' : 'Guardar';
  }
}
