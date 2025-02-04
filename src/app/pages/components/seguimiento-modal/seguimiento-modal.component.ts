import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { IconsModule } from '../../../icons/icons.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductoModalComponent } from '../producto-modal/producto-modal.component';
import { RelSeguimentoProductoResponse } from '../../../models/responses/relaciones/RelSeguimentoProductoResponse';
import { EvidenciaResponse } from '../../../models/responses/evidencia/EvidenciaResponse';
import { EvidenciaModalComponent } from '../evidencia-modal/evidencia-modal.component';
import { SeguimientoProductoEvidenciaRequest } from '../../../models/requests/seguimento/SeguimientoProductoEvidenciaRequest';
import { SeguimientoService } from '../../../services/seguimiento.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-seguimiento-modal',
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
    MatIcon,
    MatListModule,
    MatTableModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    IconsModule,
    MatSlideToggleModule,
    FormsModule,
    MatTabsModule
  ],
  templateUrl: './seguimiento-modal.component.html',
  styleUrl: './seguimiento-modal.component.css'
})
export class SeguimientoModalComponent implements OnInit {
  seguimientoForm!: FormGroup;

  fb = inject(FormBuilder);
  // dialogRef = inject(MatDialogRef<SeguimientoModalComponent>);
  dialog = inject(MatDialog);
  seguimientoService = inject(SeguimientoService);
  swalLoading = inject(LoadingService);
  idReporteServicio: number = 0;

  productosDisplayedColumns: string[] = ['producto', 'cantidad', 'montoGasto', 'porcentaje', 'montoVenta', 'acciones'];
  productosDataSource = new MatTableDataSource<any>([]);
  evidenciasDisplayedColumns: string[] = ['name', 'size', 'actions'];
  evidenciasDataSource = new MatTableDataSource<any>([]);

  listaProductos: RelSeguimentoProductoResponse[] = [];
  listaEvidencias: EvidenciaResponse[] = [];

  constructor(
    public dialogRef: MatDialogRef<SeguimientoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idReporteServicio: number; }
  ) {
    this.idReporteServicio = data.idReporteServicio;
    console.log('Datos recibidos:', data);
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.seguimientoForm = this.fb.group({
      seguimiento: ['', [Validators.required, Validators.maxLength(300)]],
      proximaVisita: [null],
      descripcionProximaVisita: ['', [Validators.maxLength(500)]],
      productos: this.fb.array([]),
      evidencias: this.fb.array([])
    });
  }

  agregarSeguimiento() {
    try {
      this.swalLoading.showLoading("Nuevo Seguimiento", "Guardando nuevo seguimiento...");
      if (!this.seguimientoForm.valid) {
        return;
      }

      const formValue = this.seguimientoForm.value;
      console.log('onSubmit, form:', formValue);

      const request: SeguimientoProductoEvidenciaRequest = {
        ...formValue,
        // seguimiento: "",
        idReporteServicio: this.idReporteServicio,
        proximaVisita: null,
        descripcionProximaVisita: "",
        productos: this.listaProductos,
        evidencias: this.listaEvidencias,
      };

      this.seguimientoService.NuevoSeguimientoProductoEvidencia(request).subscribe({
        next: (response) => {
          if (response.success) {
            this.seguimientoForm.reset();
            this.listaProductos = [];
            this.productosDataSource.data = [];
            this.listaEvidencias = [];
            this.evidenciasDataSource.data = [];

            this.swalLoading.close();
            this.swalLoading.showSuccess("Nuevo Seguimetno", "Seguimento guardado correctamente");
          }
          else {
            this.swalLoading.close();
            this.swalLoading.showError("Formulario inválido", response.message);
          }
        },
        error: (err) => {
          this.swalLoading.close();
          this.swalLoading.showError("Guardar Reporte de Solicitud", this.getErrorMessage(err));
        }
      });
      this.dialogRef.close();
    }
    catch (err) {
      this.swalLoading.close();
      console.error('agregarSeguimiento', err);
    }
  }

  removeProducto(index: number): void {
    this.productosDataSource.data = [...this.productosDataSource.data.slice(0, index), ...this.productosDataSource.data.slice(index + 1)];
  }

  removeFile(index: number): void {
    this.evidenciasDataSource.data = [...this.evidenciasDataSource.data.slice(0, index), ...this.evidenciasDataSource.data.slice(index + 1)];
  }

  toggleBase64(file: { showBase64: boolean }): void {
    file.showBase64 = !file.showBase64;
  }

  abrirAgregarProdutoModal(): void {
    const dialogRef = this.dialog.open(ProductoModalComponent, {
      // panelClass: 'modal-lg'
      width: '60vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Datos del modal:', result);

        this.agregarOActualizarProducto(result);
      }
    });
  }

  agregarOActualizarProducto(producto: any): void {
    const productos = this.productosDataSource.data; // Accede a los datos actuales

    // Busca si el producto ya existe por su ID
    const productoExistente = productos.find(item => item.id === producto.id);

    if (productoExistente) {
      // Si existe, actualiza la cantidad
      productoExistente.cantidad += producto.cantidad;
    } else {
      // Si no existe, agrega el producto
      productos.push(producto);
    }

    // Actualiza el dataSource con los nuevos datos
    this.productosDataSource.data = [...productos];
    this.listaProductos = [...productos];
  }

  abrirAgregarEvidenciaModal(): void {
    const dialogRef = this.dialog.open(EvidenciaModalComponent, {
      // panelClass: 'modal-lg'
      width: '60vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.documentos.forEach((doc: any) => {
          this.listaEvidencias.push(doc);
        });

        this.evidenciasDataSource.data = [...this.listaEvidencias];
        // this.listaEvidencias = [...result.documentos];
      }
    });
  }

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
