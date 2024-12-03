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

  constructor(private fb: FormBuilder, private catalogos: CatalogosService,
    private swalLoading: LoadingService, private productoService: ProductoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fnInitForm();

    // Obtener el ID de usuario de la ruta, si es necesario
    const productoId = this.route.snapshot.paramMap.get('id');
    if (productoId) {
      console.log('ID de producto:', productoId);
      this.productoService.ProductoPorId(parseInt(productoId)).subscribe({
        next: (response) => {
          if (response.success) {
            this.productoForm.patchValue(response.data);
          }
        },
        error: (err) => {
          console.error('Error al guardar producto', err);
        }
      });
    }
  }

  fnInitForm() {
    this.productoForm = this.fb.group({
      id: [null],
      idGrupoProducto: [null, [Validators.required]],
      producto: ['', [Validators.required, Validators.maxLength(250)]],
      codigo: ['', [Validators.required, Validators.maxLength(30)]],
      descripcion: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  onSubmit(): void {
    /*
    this.swalLoading.showLoading("Guardar Cliente", "Guardando cliente...");
    try {
      if (this.productoForm.valid) {
        if (this.productoForm.value.id) {
          // Actualizar cliente.
          const actualizarRequest: ActualizarProductoRequest = { ...this.productoForm.value };
          this.productoForm.ActualizarProducto(actualizarRequest).subscribe({
            next: (response) => {
              if (response.success) {
                this.productoForm.reset();
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
              this.swalLoading.showError("Actualizar Cliente", err);
            }
          });
        }
        else {
          // Guardar nuevo Producto.
          const nuevoRequest: NuevoProductoRequest = { ...this.productoForm.value };
          this.productoForm.NuevoProducto(nuevoRequest).subscribe({
            next: (response) => {
              if (response.success) {
                this.productoForm.reset();
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
    */
  }

  onCancel(): void {
    this.productoForm.reset();
  }

  get buttonText(): string {
    return this.productoForm.value.id ? 'Actualizar' : 'Guardar';
  }
}
