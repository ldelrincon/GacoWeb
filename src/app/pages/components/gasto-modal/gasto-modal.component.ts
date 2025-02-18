import { GastoService } from './../../../services/gasto.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoadingService } from '../../../services/loading.service';
import { ActualizarGastoRequest } from '../../../models/requests/gastos/ActualizarGastoRequest';
import { NuevoGastoRequest } from '../../../models/requests/gastos/NuevoGastoRequest';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gasto-modal',
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
    MatAutocompleteModule,
    FormsModule,
    MatDialogModule,
    MatDivider
  ],
  templateUrl: './gasto-modal.component.html',
  styleUrl: './gasto-modal.component.css'
})
export class GastoModalComponent implements OnInit {
  gastoForm!: FormGroup;

  private swalLoading = inject(LoadingService);
  private gastoService = inject(GastoService);
  private router = inject(Router);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GastoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fnInitForm();
  }

  ngOnInit(): void {
    if (this.data?.id) {
      this.swalLoading.showLoading();
      console.log('ID de gasto recibido:', this.data.id);
      this.gastoService.GastoPorId(this.data.id).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('data', response.data);
            this.gastoForm.patchValue(response.data);
            console.log('patchValue', this.gastoForm.value);
            this.swalLoading.close();
          }
        },
        error: (err) => {
          console.error('Error al obtener gasto', err.error.message);
          this.swalLoading.close();
        }
      });
    }
  }

  fnInitForm() {
    this.gastoForm = this.fb.group({
      id: [null],
      concepto: ['', [Validators.required, Validators.maxLength(250)]],
      fecha: [new Date().toISOString(), [Validators.required]], // Ajuste a formato DateTime
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      monto: [0, [Validators.required, Validators.min(0.01)]],
      factura: [false, [Validators.required]], // Se asume false por defecto
      rutaPDFFactura: [null], // Opcional
      rutaXMLFactura: [null], // Opcional
    });
  }

  guardar(): void {
    this.swalLoading.showLoading("Guardar Gasto", "Guardando gasto...");
    try {
      if (this.gastoForm.valid) {
        if (this.gastoForm.value.id) {
          // Actualizar gasto.
          const actualizarRequest: ActualizarGastoRequest = { ...this.gastoForm.value };
          // actualizarRequest.fecha = this.gastoForm.value.fecha.toISOString().split('T')[0];
          this.gastoService.ActualizarGasto(actualizarRequest).subscribe({
            next: (response) => {
              if (response.success) {
                this.swalLoading.close();
                Swal.fire({
                  title: 'Nuevo Gasto',
                  text: 'Gasto guardado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              } else {
                this.swalLoading.close();
                this.swalLoading.showError("Formulario inválido", response.message);
              }
            },
            error: (err) => {
              this.swalLoading.close();
              this.swalLoading.showError("Actualizar Gasto", err.error.message);
            }
          });
        } else {
          // Guardar nuevo gasto.
          const nuevoRequest: NuevoGastoRequest = { ...this.gastoForm.value };
          // nuevoRequest.fecha = this.gastoForm.value.fecha.toISOString().split('T')[0];
          this.gastoService.NuevoGasto(nuevoRequest).subscribe({
            next: (response) => {
              if (response.success) {
                this.swalLoading.close();
                Swal.fire({
                  title: 'Nuevo Gasto',
                  text: 'Gasto guardado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              } else {
                this.swalLoading.close();
                this.swalLoading.showError("Formulario inválido", response.message);
              }
            },
            error: (err) => {
              this.swalLoading.close();
              this.swalLoading.showError("Guardar Gasto", err.error.message);
            }
          });
        }
      } else {
        this.swalLoading.close();
        this.swalLoading.showError("Guardar Gasto", 'Formulario no válido.');
      }
    } catch (ex: any) {
      this.swalLoading.close();
      this.swalLoading.showError("Guardar Gasto", ex.message);
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
