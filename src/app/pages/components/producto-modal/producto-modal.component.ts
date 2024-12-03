import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
  ],
  templateUrl: './producto-modal.component.html',
  styleUrl: './producto-modal.component.css'
})
export class ProductoModalComponent implements OnInit {
  productoForm: FormGroup;
  productos = [
    { id: 1, nombre: 'Producto 1', descripcion: 'Desc 1', stock: 10 },
    { id: 2, nombre: 'Producto 2', descripcion: 'Desc 2', stock: 5 },
    { id: 3, nombre: 'Producto 3', descripcion: 'Desc 3', stock: 8 },
  ];
  // productosFiltrados = this.productos;
  productosFiltrados: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      stock: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productosFiltrados = this.productos;
  }

  buscarProducto(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.productosFiltrados = this.productos.filter((p) =>
      p.nombre.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  seleccionarProducto(producto: any): void {
    this.productoForm.patchValue({
      producto: producto.nombre,
      descripcion: producto.descripcion,
      stock: producto.stock,
    });
  }

  aceptar(): void {
    if (this.productoForm.valid) {
      this.dialogRef.close(this.productoForm.value);
    }
  }
}
