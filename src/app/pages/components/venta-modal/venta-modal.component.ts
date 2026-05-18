import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDivider } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-venta-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDivider,
    MatAutocompleteModule
  ],
  templateUrl: './venta-modal.component.html',
  styleUrls: ['./venta-modal.component.css']
})
export class VentaModalComponent implements OnInit {
  ventaForm: FormGroup;

  clientes: any[] = [];
  clientesFiltrados: any[] = [];

  listaEstatus = [
    { id: 4, nombre: 'Facturado' },
    { id: 11, nombre: 'Pagado' },
    { id: 12, nombre: 'No Pagado' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VentaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteService: ClienteService
  ) {
    this.ventaForm = this.fb.group({
      IdVentas: [null],
      descripcion: ['', [Validators.required]],
      idCliente: [null, [Validators.required]],
      fechaVenta: [null, [Validators.required]],
      cantidad: [null, [Validators.required, Validators.min(0.01)]],
      precio: [null, [Validators.required, Validators.min(0)]],
      estatus: [null, [Validators.required]],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    // Cargar clientes para el autocomplete.
    this.fnGetListaCatalogoClientes();

    // Si se recibe data para edición, precargar valores aquí.
    if (this.data) {
      this.ventaForm.patchValue(this.normalizeInitialData(this.data));
    }
  }

  private normalizeInitialData(data: any): any {
    const initial: any = {
      IdVentas: data.IdVentas ?? data.id ?? null,
      descripcion: data.descripcion ?? data.Descripcion ?? '',
      cantidad: data.cantidad ?? data.Cantidad ?? null,
      precio: data.precio ?? data.Precio ?? null,
      estatus: data.estatus ?? data.Estatus ?? null,
      observaciones: data.observaciones ?? data.Observaciones ?? ''
    };

    if (data.idCliente || data.IdCliente) {
      initial.idCliente = {
        id: data.idCliente?.id ?? data.idCliente ?? data.IdCliente ?? null,
        nombre: data.idCliente?.nombre ?? data.Cliente ?? data.cliente ?? '' ,
        codigo: data.idCliente?.codigo ?? ''
      };
    }

    const fechaValue = data.fechaVenta ?? data.FechaVenta ?? data.fecha ?? data.Fecha;
    initial.fechaVenta = fechaValue ? new Date(fechaValue) : null;

    return initial;
  }

  fnGetListaCatalogoClientes(): void {
    this.clienteService.ListaCatalogoClientes().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.clientes = response.data;
          this.clientesFiltrados = this.clientes;
        }
      },
      error: (err: any) => {
        console.error('Error al cargar los clientes', err);
      }
    });
  }

  buscarCliente(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.clientesFiltrados = this.clientes.filter((item) =>
      `${item.codigo} - ${item.nombre}`.toLowerCase().includes(inputValue)
    );
  }

  displayCliente = (item: any): string => {
    return item ? `${item.codigo} - ${item.nombre}` : '';
  };

  cancelar(): void {
    this.dialogRef.close();
  }

  guardarVenta(): void {
    if (this.ventaForm.valid) {
      this.dialogRef.close(this.ventaForm.value);
    }
  }
}
