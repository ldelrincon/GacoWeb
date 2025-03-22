import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BusquedaProductoRequest } from '../../../models/requests/productos/BusquedaProductoRequest';
import { ProductoService } from '../../../services/producto.service';
import { MatDivider } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductoComponent } from '../../admin/productos/producto/producto.component';

@Component({
  selector: 'app-producto-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatDivider,
    FlexLayoutModule,
    MatButton
  ],
  templateUrl: './producto-modal.component.html',
  styleUrl: './producto-modal.component.css'
})
export class ProductoModalComponent implements OnInit {
  productoForm: FormGroup;
  productos: any[] = [];
  productosFiltrados: any;
  MontoVenta: number = 0;
  private dialog = inject(MatDialog)

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      id: [null, [Validators.required]],
      codigo: [null, [Validators.required]],
      producto: [null, [Validators.required]],
      descripcion: [''],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      montoGasto: ['', [Validators.required]],
      stock: ['', Validators.required],
      montoVenta: [''],
      porcentaje: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  CalculatVenta() {
    //debugger;
    var Gasto = this.productoForm.value.montoGasto;
    var Porcentaje = this.productoForm.value.porcentaje ;
    var MontoGasto = (Gasto / Porcentaje);

    this.productoForm.value.montoVenta = MontoGasto;
    this.MontoVenta = MontoGasto;
  }
  obtenerProductos() {
    try {
      const request: BusquedaProductoRequest = {
        busqueda: '',
        numeroPagina: 1,
        cantidadPorPagina: -1,
      };

      this.productoService.Busqueda(request).subscribe({
        next: (response) => {
          this.productos = response.data;
          this.productosFiltrados = this.productos;
        },
        error: (err) => {
          console.error('Error al cargar Producto', err);
        }
      });
    }
    catch (ex: any) {
      console.log(ex);
    }
  }

  buscarProducto(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.productosFiltrados = this.productos.filter(item =>
      `${item.codigo} - ${item.producto}`.toLowerCase().includes(query)
    );
  }

  displayProducto(item: any): string {
    return item ? `${item.codigo} - ${item.producto}` : '';
  }

  seleccionarProducto(item: any): void {
    this.productoForm.patchValue({
      id: item.id,
      codigo: item.codigo,
      producto: item.producto,
      descripcion: item.descripcion,
      stock: 0,
      montoGasto: item.montoGasto,
    });
  }

  AgregarProductoClick(): void {
    if (this.productoForm.valid) {
      console.log(this.productoForm.value);
      this.dialogRef.close(this.productoForm.value);
    }
  }

  AgregarNuevoProductoClick(): void {
    const dialogRef = this.dialog.open(ProductoComponent, {
      width: '500px',
      data: true,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerProductos();
    });
  }
}
