import { DetGastoResponse } from './../../../models/responses/gastos/detGastoResponse';
import { GastoService } from './../../../services/gasto.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoadingService } from '../../../services/loading.service';
import { ActualizarGastoRequest } from '../../../models/requests/gastos/ActualizarGastoRequest';
import { NuevoGastoRequest } from '../../../models/requests/gastos/NuevoGastoRequest';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IconsModule } from '../../../icons/icons.module';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DetGastoRequest } from '../../../models/requests/gastos/detGastoRequest';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-gasto-modal',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    FormsModule,
    MatDialogModule,
    MatDivider,
    MatIconModule,
    IconsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatTooltipModule,
    MatToolbarModule
  ],
  templateUrl: './gasto-modal.component.html',
  styleUrl: './gasto-modal.component.css'
})
export class GastoModalComponent implements OnInit {
  gastoForm!: FormGroup;
  detGastosDisplayedColumns: string[] = ['fecha', 'descripcion', 'monto', 'acciones'];
  detGastosDataSource = new MatTableDataSource<any>([]);
  listaDetGastos: DetGastoResponse[] = [];

  fechaDetalle: Date = new Date();  // Inicialización con la fecha actual
  descripcionDetalle: string = '';
  montoDetalle: number = 0;
  idGasto: number = 0;

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
            this.idGasto = response.data.id;

            console.log('data', response.data);
            this.gastoForm.patchValue(response.data);

            // Limpiar las listas antes de asignar los nuevos datos
            this.detGastosDataSource.data = [];
            this.listaDetGastos = [];

            // Asignar los nuevos detalles de gasto
            this.detGastosDataSource.data = response.data.detGastos;
            this.listaDetGastos = response.data.detGastos;

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
      fecha: [new Date().toISOString()], // Ajuste a formato DateTime
      descripcion: [''],
      monto: [0],
      // factura: [false, [Validators.required]], // Se asume false por defecto
      // rutaPDFFactura: [null], // Opcional
      // rutaXMLFactura: [null], // Opcional
    });
  }

  guardar(): void {
    this.swalLoading.showLoading("Guardar Gasto", "Guardando gasto...");
    try {
      if (this.gastoForm.valid) {
        if (this.gastoForm.value.id) {
          // Actualizar gasto.
          const actualizarRequest: ActualizarGastoRequest = { ...this.gastoForm.value, detGastos: this.listaDetGastos };
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
          const nuevoRequest: NuevoGastoRequest = { ...this.gastoForm.value, detGastos: this.listaDetGastos };
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

  removeGasto(index: number): void {
    const detGastoEliminar = this.detGastosDataSource.data[index];

    // Filtra los detalles de gastos para eliminar el que coincide con fecha, descripción y monto
    this.detGastosDataSource.data = this.detGastosDataSource.data.filter(
      (gasto) =>
        gasto.fecha !== detGastoEliminar.fecha ||
        gasto.descripcion !== detGastoEliminar.descripcion ||
        gasto.monto !== detGastoEliminar.monto
    );

    // Actualiza la lista de detalles de gastos
    this.listaDetGastos = [...this.detGastosDataSource.data];
  }

  agregarOActualizarDetGasto(): void {
    if (!this.fechaDetalle || !this.descripcionDetalle.trim() || this.montoDetalle <= 0) {
      this.swalLoading.showError("Agregar Detalle", "Por favor, llena todos los campos correctamente.");
      return;
    }

    const detGasto: DetGastoRequest = {
      idGasto: this.idGasto,
      fecha: this.fechaDetalle.toISOString().split('T')[0],
      descripcion: this.descripcionDetalle,
      monto: this.montoDetalle,
      factura: false,
      rutaPdfFactura: null,
      rutaXmlFactura: null,
      idCatEstatus: 1
    };

    // Accede a los datos actuales
    const detGastos = this.detGastosDataSource.data;

    // Actualiza o agrega un nuevo detalle de gasto
    detGastos.push(detGasto);

    // Actualiza la fuente de datos
    this.detGastosDataSource.data = [...detGastos];
    this.listaDetGastos = [...detGastos];

    // Reinicia los campos de detalle
    this.fechaDetalle = new Date();
    this.descripcionDetalle = '';
    this.montoDetalle = 0;
  }
}
