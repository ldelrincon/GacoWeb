import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder, private catalogos: CatalogosService, private swalLoading: LoadingService, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.fnInitForm();
    this.fnGetRegimenesFiscales();
    this.fnGetEstados();
  }

  fnInitForm() {
    this.clientesForm = this.fb.group({
      Nombre: ['', [Validators.required, Validators.maxLength(250)]],
      RFC: [
        '',
        [
          Validators.required,
          Validators.maxLength(13), // Máximo 13 caracteres para RFC estándar
          Validators.pattern(
            '^([A-ZÑ&]{3,4})\\d{6}([A-Z\\d]{3})?$' // RFC formato estándar mexicano
          ),
        ],
      ],
      Telefono: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$'), // Solo dígitos, exactamente 10
          Validators.maxLength(10), // Refuerzo para no superar 10 caracteres
        ],
      ],
      Correo: [
        '',
        [
          Validators.required,
          Validators.email, // Validador nativo de Angular
          Validators.maxLength(300),
        ],
      ],
      Direccion: ['', [Validators.required, Validators.maxLength(500)]],
      CodigoPostal: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{5}$'), // Código postal mexicano: 5 dígitos
          Validators.maxLength(5), // Máximo 5 dígitos
        ],
      ],
      RazonSocial: ['', [Validators.required, Validators.maxLength(300)]],
      Codigo: ['', [Validators.required, Validators.maxLength(30)]],
      IdRegimenFiscal: [null, [Validators.required]],
      IdCatEstado: [null, [Validators.required]],
      IdCatMunicipio: [null, [Validators.required]],
      FechaCreacion: [{ value: new Date(), disabled: true }, Validators.required],
      FechaModificacion: [{ value: null, disabled: true }],
      IdCatEstatus: [1, [Validators.required]], // Valor por defecto
    });
  }

  onSubmit(): void {
    this.swalLoading.showLoading("Guardar Cliente", "Guardando cliente...");
    try {
      if (this.clientesForm.valid) {
        // Generar request.
        const request: NuevoClienteRequest = {
          telefono: this.clientesForm.value.Telefono,
          rfc: this.clientesForm.value.RFC,
          direccion: this.clientesForm.value.Direccion,
          idCatEstatus: this.clientesForm.value.IdCatEstatus,
          nombre: this.clientesForm.value.Nombre,
          codigo: this.clientesForm.value.Codigo,
          idCatMunicipio: this.clientesForm.value.IdCatMunicipio,
          codigoPostal: this.clientesForm.value.CodigoPostal,
          razonSocial: this.clientesForm.value.RazonSocial,
          idRegimenFiscal: this.clientesForm.value.IdRegimenFiscal,
          correo: this.clientesForm.value.Correo,
        };
        // Enviar a guardar.
        this.clienteService.NuevoCliente(request).subscribe({
          next: (response) => {
            if (response.success) {
              this.clientesForm.reset();
              this.swalLoading.close();
              this.swalLoading.showSuccess("Nuevo Cliente", "Cliente guardado correctamente");
            }
            else {
              this.swalLoading.close();
              this.swalLoading.showError("Formulario inválido", response.message);
            }
          },
          error: (err) => {
            this.swalLoading.close();
            this.swalLoading.showError("Guardar Cliente", err);
          }
        });
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
        console.error('Error al cargar el catalogo', err);
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
        console.error('Error al cargar el catalogo', err);
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
        console.error('Error al cargar el catalogo', err);
      }
    });
  }
}
