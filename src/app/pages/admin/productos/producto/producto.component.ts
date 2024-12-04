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
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../../services/producto.service';
import { ActualizarProductoRequest } from '../../../../models/requests/productos/ActualizarProductoRequest';
import { NuevoProductoRequest } from '../../../../models/requests/productos/NuevoProductoRequest';

@Component({
  selector: 'app-producto',
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
    FormsModule,
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  productoForm!: FormGroup;
  grupoProductos: any[] = [];
  grupoProductosFiltrados: any;

  constructor(private fb: FormBuilder, private catalogos: CatalogosService,
    private swalLoading: LoadingService, private productoService: ProductoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fnInitForm();
    this.fnCargarCatGrupoProductos();

    const productoId = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(productoId))) {
      this.fnObtenerProductoPorId(Number(productoId));
    }
  }

  fnObtenerProductoPorId(id: number) {
    this.productoService.ProductoPorId(id).subscribe({
      next: (response) => {
        if (response.success) {
          const producto = response.data;

          // Buscar el grupo correspondiente por su id.
          const grupoSeleccionado = this.grupoProductos.find(
            (grupo) => grupo.id === producto.idCatGrupoProducto
          );

          // Asignar el objeto completo al formulario.
          this.productoForm.patchValue({
            ...producto,
            idCatGrupoProducto: grupoSeleccionado || null, // Si no se encuentra, asignar null.
          });
        }
      },
      error: (err) => {
        console.error('Error al guardar producto', err);
      }
    });
  }

  fnInitForm() {
    this.productoForm = this.fb.group({
      id: [null],
      idCatGrupoProducto: [null, [Validators.required]],
      producto: ['', [Validators.required, Validators.maxLength(250)]],
      codigo: ['', [Validators.required, Validators.maxLength(30)]],
      descripcion: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  fnCargarCatGrupoProductos() {
    this.catalogos.ListaCatGrupoProductos().subscribe({
      next: (response) => {
        if (response.success) {
          this.grupoProductos = response.data;
          this.grupoProductosFiltrados = this.grupoProductos;
        }
      },
      error: (err) => {
        console.error('Error al guardar producto', err);
      }
    });
  }

  onSubmit(): void {
    this.swalLoading.showLoading("Guardar Cliente", "Guardando cliente...");
    try {
      if (this.productoForm.valid) {
        const formValue = this.productoForm.value;

        if (this.productoForm.value.id) {
          // Actualizar cliente.
          const actualizarRequest: ActualizarProductoRequest = {
            ...formValue,
            idCatGrupoProducto: formValue.idCatGrupoProducto?.id,
          };
          this.productoService.ActualizarProducto(actualizarRequest).subscribe({
            next: (response) => {
              if (response.success) {
                this.productoForm.reset();
                this.swalLoading.close();
                this.swalLoading.showSuccess("Actualizar producto", "Cliente guardado correctamente");
              }
              else {
                this.swalLoading.close();
                this.swalLoading.showError("Formulario inválido", response.message);
              }
            },
            error: (err) => {
              this.swalLoading.close();
              console.log(err, this.getErrorMessage(err));
              this.swalLoading.showError("Actualizar Cliente", this.getErrorMessage(err));
            }
          });
        }
        else {
          // Guardar nuevo Producto.
          const nuevoRequest: NuevoProductoRequest = {
            ...formValue,
            idCatGrupoProducto: formValue.idCatGrupoProducto?.id,
          };
          this.productoService.NuevoProducto(nuevoRequest).subscribe({
            next: (response) => {
              if (response.success) {
                this.productoForm.reset();
                this.swalLoading.close();
                this.swalLoading.showSuccess("Nuevo producto", "Producto guardado correctamente");
              }
              else {
                this.swalLoading.close();
                this.swalLoading.showError("Formulario inválido", response.message);
              }
            },
            error: (err) => {
              this.swalLoading.close();
              this.swalLoading.showError("Guardar producto", this.getErrorMessage(err));
            }
          });
        }
      } else {
        // Cerrar cargando.
        this.swalLoading.close();
        this.swalLoading.showError("Guardar producto", 'Formulario no válido.');
      }
    }
    catch (ex: any) {
      // Cerrar cargando.
      this.swalLoading.close();
      this.swalLoading.showError("Guardar producto", ex.message);
    }
  }

  onCancel(): void {
    this.productoForm.reset();
  }

  get buttonText(): string {
    return this.productoForm.value.id ? 'Actualizar' : 'Guardar';
  }

  buscarGrupoProducto(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.grupoProductosFiltrados = this.grupoProductos.filter((item) =>
      item.grupo.toLowerCase().includes(inputValue)
    );
  }

  seleccionarGrupoProducto(grupo: any): void {
    this.productoForm.get('idCatGrupoProducto')?.setValue(grupo.id);
  }

  displayGrupoProducto = (grupo: any): string => {
    return grupo ? grupo.grupo : '';
  };

  getErrorMessage(err: any): string {
    if (err.error && err.error.message) {
      return err.error.message; // Mensaje específico del backend.
    }
    if (err.message) {
      return err.message; // Mensaje genérico.
    }
    return 'Ocurrió un error desconocido. Por favor, intenta nuevamente.';
  }
}
