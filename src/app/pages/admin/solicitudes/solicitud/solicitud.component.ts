import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClienteService } from '../../../../services/cliente.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductoModalComponent } from '../../../components/producto-modal/producto-modal.component';
import { EvidenciaModalComponent } from '../../../components/evidencia-modal/evidencia-modal.component';

@Component({
  selector: 'app-solicitud',
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
    MatCheckbox,
    MatIcon,
    MatListModule,
    MatTableModule,
    MatGridListModule,
    MatDialogModule
  ],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.css'
})
export class SolicitudComponent implements OnInit {
  reporteServiciosForm!: FormGroup;

  clientes: any[] = [];
  tecnicos: any[] = [];

  productosDisplayedColumns: string[] = ['cantidad', 'producto', 'acciones'];
  productosDataSource = new MatTableDataSource<Producto>([]);

  evidenciasDisplayedColumns: string[] = ['evidencia', 'descripcion', 'acciones'];
  evidenciasDataSource = new MatTableDataSource<any>([]);

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private usuarioService: UsuarioService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();
    this.fnGetListaCatalogoClientes();
    this.fnGetTecnicos();
    this.productosDataSource.data = [];
  }

  // Inicializar el formulario con validaciones
  private initForm(): void {
    this.reporteServiciosForm = this.fb.group({
      Titulo: ['', [Validators.required, Validators.maxLength(300)]],
      Descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      Accesorios: ['', Validators.maxLength(500)],
      ServicioPreventivo: [false],
      ServicioCorrectivo: [false],
      ObservacionesRecomendaciones: ['', [Validators.required, Validators.maxLength(500)]],
      FechaInicio: [null], // Fecha opcional
      IdCliente: [null, Validators.required],
      IdUsuarioEncargado: [null, Validators.required],
      IdUsuarioTecnico: [null, Validators.required],
      FechaProximaVisita: [null], // Fecha opcional
      DescripcionVisita: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.reporteServiciosForm.valid) {
      const formData = this.reporteServiciosForm.value;
      console.log('Datos del formulario enviados:', formData);
      // Aquí podrías llamar a un servicio para guardar los datos
    } else {
      console.error('Formulario inválido. Por favor, verifica los campos.');
    }
  }

  // Método para manejar la cancelación
  onCancel(): void {
    this.reporteServiciosForm.reset();
    console.log('Formulario reseteado.');
  }

  // Métodos de ayuda para los selectores (opcional)
  getClienteNombre(id: number): string {
    return this.clientes.find(cliente => cliente.id === id)?.nombre || '';
  }

  getTecnicoNombre(id: number): string {
    return this.tecnicos.find(tecnico => tecnico.id === id)?.nombre || '';
  }

  onUsuarioEncargadoSeleccionado(event: any): void {
    console.log('UsuarioEncargado seleccionado:', event);
  }

  fnGetListaCatalogoClientes() {
    this.clienteService.ListaCatalogoClientes().subscribe({
      next: (response) => {
        if (response.success) {
          this.clientes = response.data;
        }
      },
      error: (err) => {
        console.error('Error al cargar los clientes', err);
      }
    });
  }

  fnGetTecnicos() {
    // Obtener operadores.
    this.usuarioService.UsuariosPorTipo(2).subscribe({
      next: (response) => {
        if (response.success) {
          this.tecnicos = response.data;
        }
      },
      error: (err) => {
        console.error('Error al cargar los usuarios operadores(Tecnicos)', err);
      }
    });
  }

  abrirAgregarProdutoModal(): void {
    const dialogRef = this.dialog.open(ProductoModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Datos del modal:', result);
      }
    });
  }

  abrirAgregarEvidenciaModal(): void {
    const dialogRef = this.dialog.open(EvidenciaModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Datos del modal:', result);
      }
    });
  }
}

export interface Producto {
  cantidad: number,
  producto: string,
  descripcion: string,
}
