import { CatTipoSolicitudResponse } from './../../../../models/responses/catalogos/CatTipoSolicitudResponse';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IconsModule } from '../../../../icons/icons.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteServicioService } from '../../../../services/reporte-servicio.service';
import { LoadingService } from '../../../../services/loading.service';
import { ActualizarReporteServicioRequest } from '../../../../models/requests/reporte-solicitud/ActualizarReporteSolicitudRequest';
import { NuevoReporteServicioRequest } from '../../../../models/requests/reporte-solicitud/NuevoReporteSolicitudRequest';
import { RelSeguimentoProductoResponse } from '../../../../models/responses/relaciones/RelSeguimentoProductoResponse';
import { EvidenciaResponse } from '../../../../models/responses/evidencia/EvidenciaResponse';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';
import { CambiarEstatusEnSeguimentoRequest } from '../../../../models/requests/reporte-solicitud/CambiarEstatusEnSeguimentoRequest';
import { FormsModule } from '@angular/forms';
import { CatalogosService } from '../../../../services/catalogos.service';
import { VerEvidenciaModalComponent } from '../../../components/ver-evidencia-modal/ver-evidencia-modal.component';

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
    MatDialogModule,
    MatAutocompleteModule,
    IconsModule,
    MatSlideToggleModule,
    FormsModule
  ],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.css'
})
export class SolicitudComponent implements OnInit {
  reporteServiciosForm!: FormGroup;

  clientes: any[] = [];
  clientesFiltrados: any[] = [];

  usuariosTecnicos: any[] = [];
  usuariosTecnicosFiltrados: any[] = [];

  productosDisplayedColumns: string[] = ['producto', 'cantidad', 'montoGasto', 'porcentaje', 'montoVenta', 'acciones'];
  productosDataSource = new MatTableDataSource<any>([]);

  // evidenciasDisplayedColumns: string[] = ['name', 'extension', 'size', 'base64', 'actions'];
  evidenciasDisplayedColumns: string[] = ['name', 'size', 'actions'];
  evidenciasDataSource = new MatTableDataSource<any>([]);

  listaProductos: RelSeguimentoProductoResponse[] = [];
  listaEvidencias: EvidenciaResponse[] = [];

  IdReporteServicio: number = 0;
  servicioIniciado: boolean = false;
  MontoVenta: number = 0;

  catalogoTipoSolicitudes: CatTipoSolicitudResponse[] = [];
  selectedTipoSolicitud!: number; // Variable para el valor seleccionado

  // Servicios.
  private clienteService = inject(ClienteService);
  private ReporteServicioService = inject(ReporteServicioService);
  private usuarioService = inject(UsuarioService);
  private swalLoading = inject(LoadingService);
  private router = inject(Router);
  private catalogosService = inject(CatalogosService);

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();
    this.fnObtenerCatalogosService();
    this.fnGetListaCatalogoClientes();
    this.fnGetTecnicos();
    this.productosDataSource.data = [];

    const ReporteServicioId = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(ReporteServicioId))) {
      this.IdReporteServicio = Number(this.route.snapshot.paramMap.get('id'));
      this.fnObtenerReporteServicioPorId(Number(ReporteServicioId));
    }
  }

  // EnvioCorreo() {
  //   const ReporteServicioId = this.route.snapshot.paramMap.get('id');
  //   this.ReporteServicioService.EnvioCorreo(Number(ReporteServicioId)).subscribe({
  //     next: (response) => {
  //       if (response) {
  //         this.swalLoading.showSuccess("Envio de correo", "Correo enviado con exito");
  //       }
  //     },
  //     error: (err) => {
  //       this.swalLoading.showError("Error envio de correo", err.message);
  //       console.error('Error al cargar el reporte de solicitud', err);
  //     }
  //   });
  // }

  fnObtenerReporteServicioPorId(id: number) {
    this.swalLoading.showLoading();
    this.ReporteServicioService.ReporteServicioPorId(id).subscribe({
      next: (response) => {
        if (response.success) {
          const reporteServicio = response.data;
          console.log('reporteServicio:', reporteServicio);
          // Asignar el objeto completo al formulario.
          this.reporteServiciosForm.patchValue(reporteServicio);
          this.seleccionarClienteId(reporteServicio.idCliente);
          // this.seleccionarUsuarioTecnicoId(reporteServicio.idUsuarioTecnico);
          this.fnSetListaProductos(reporteServicio.productos);
          this.fnSetListaEvidencias(reporteServicio.evidencias);
          this.selectedTipoSolicitud = reporteServicio.idCatSolicitud;
        }
        this.swalLoading.close();
      },
      error: (err) => {
        console.error('Error al cargar el reporte de solicitud', err);
        this.swalLoading.close();
      }
    });
  }

  fnObtenerCatalogosService() {
    this.swalLoading.showLoading();
    this.catalogosService.ListaCatTipoSolicitudes().subscribe({
      next: (response) => {
        if (response.success) {
          this.catalogoTipoSolicitudes = response.data;
          console.log('reporteServicio:', response.data);
        }
        this.swalLoading.close();
      },
      error: (err) => {
        console.error('Error al cargar el reporte de solicitud', err);
        this.swalLoading.close();
      }
    });
  }

  // Inicializar el formulario con validaciones
  private initForm(): void {
    this.reporteServiciosForm = this.fb.group({
      id: [null],
      titulo: ['', [Validators.required, Validators.maxLength(300)]],
      descripcion: ['', [Validators.required]],
      accesorios: [''],
      servicioPreventivo: [false],
      servicioCorrectivo: [false],
      observacionesRecomendaciones: ['', [Validators.required]],
      fechaInicio: [null], // Fecha opcional
      idCliente: [null, Validators.required],
      usuarioEncargado: [null, Validators.required],
      usuarioTecnico: [null, Validators.required],
      // idUsuarioTecnico: [null, Validators.required],
      proximaVisita: [null], // Fecha opcional
      descripcionProximaVisita: [''],
      productos: this.fb.array([]),
      evidencias: this.fb.array([]),
      // Mano de obra.
      montoGasto: [null],
      porcentaje: [null],
      montoVenta: [null],
    });
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    this.swalLoading.showLoading("Guardar Reporte de Solicitud", "Guardando Reporte de Solicitud...");
    try {
      if (this.reporteServiciosForm.valid) {
        const formValue = this.reporteServiciosForm.value;
        console.log('onSubmit, form:', formValue);
        if (this.reporteServiciosForm.value.id) {
          // Actualizar cliente.
          const actualizarRequest: ActualizarReporteServicioRequest = {
            ...formValue,
            idCliente: formValue.idCliente?.id,
            // idUsuarioTecnico: formValue.idUsuarioTecnico?.id,
            servicioCorrectivo: formValue.servicioCorrectivo ?? false,
            servicioPreventivo: formValue.servicioPreventivo ?? false,
            productos: this.listaProductos,
            evidencias: this.listaEvidencias,
          };
          this.ReporteServicioService.ActualizarReporteServicio(actualizarRequest).subscribe({
            next: (response) => {
              if (response.success) {
                // this.reporteServiciosForm.reset();
                this.swalLoading.close();
                this.swalLoading.showSuccess("Actualizar Reporte de Solicitud", "Reporte de Solicitud guardado correctamente");
              }
              else {
                this.swalLoading.close();
                this.swalLoading.showError("Formulario inválido", response.message);
              }
            },
            error: (err) => {
              this.swalLoading.close();
              console.log(err, this.getErrorMessage(err));
              this.swalLoading.showError("Actualizar Reporte de Solicitud", this.getErrorMessage(err));
            }
          });
        }
        else {
          // Guardar nuevo Producto.
          const nuevoRequest: NuevoReporteServicioRequest = {
            ...formValue,
            idCliente: formValue.idCliente?.id,
            idCatSolicitud: this.selectedTipoSolicitud,
            // idUsuarioTecnico: formValue.idUsuarioTecnico?.id,
            servicioCorrectivo: formValue.servicioCorrectivo ?? false,
            servicioPreventivo: formValue.servicioPreventivo ?? false,
            productos: this.listaProductos,
            evidencias: this.listaEvidencias,
          };
          this.ReporteServicioService.NuevoReporteServicio(nuevoRequest).subscribe({
            next: (response) => {
              if (response.success) {
                this.reporteServiciosForm.reset();
                this.listaProductos = [];
                this.productosDataSource.data = [];
                this.listaEvidencias = [];
                this.evidenciasDataSource.data = [];

                this.swalLoading.close();
                this.swalLoading.showSuccess("Nuevo Reporte de Solicitud", "Reporte de Solicitud guardado correctamente");
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

  // Método para manejar la cancelación
  onCancel(): void {
    this.reporteServiciosForm.reset();
    this.router.navigate(['/admin/solicitudes/lista']);
    //console.log('Formulario reseteado.');
  }

  onUsuarioEncargadoSeleccionado(event: any): void {
    console.log('UsuarioEncargado seleccionado:', event);
  }

  fnGetListaCatalogoClientes() {
    this.clienteService.ListaCatalogoClientes().subscribe({
      next: (response) => {
        if (response.success) {
          this.clientes = response.data;
          this.clientesFiltrados = this.clientes;
        }
      },
      error: (err) => {
        console.error('Error al cargar los clientes', err);
      }
    });
  }

  fnGetTecnicos() {
    this.usuarioService.UsuariosPorTipo(2).subscribe({
      next: (response) => {
        if (response.success) {
          this.usuariosTecnicos = response.data;
          this.usuariosTecnicosFiltrados = this.usuariosTecnicos;
        }
      },
      error: (err) => {
        console.error('Error al cargar los usuarios operadores(Tecnicos)', err);
      }
    });
  }

  abrirAgregarProdutoModal(): void {
    const dialogRef = this.dialog.open(ProductoModalComponent, {
      panelClass: 'modal-lg'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Datos del modal:', result);

        this.agregarOActualizarProducto(result);
      }
    });
  }

  abrirAgregarEvidenciaModal(): void {
    const dialogRef = this.dialog.open(EvidenciaModalComponent, {
      panelClass: 'modal-lg'
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

  fnSetListaEvidencias(evidencias: any) {
    try {
      this.listaEvidencias = evidencias;
      this.evidenciasDataSource.data = this.listaEvidencias;
    } catch (err: any) {
      console.log('fnSetListaEvidencias:', err);
    }
  }

  fnSetListaProductos(productos: RelSeguimentoProductoResponse[]) {
    try {
      this.listaProductos = productos;
      this.productosDataSource.data = this.listaProductos;
    } catch (err: any) {
      console.log('fnSetListaProductos:', err);
    }
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

  buscarUsuarioTecnico(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.usuariosTecnicosFiltrados = this.usuariosTecnicos.filter((item) =>
      `${item.nombres} ${item.apellidos}`.toLowerCase().includes(inputValue)
    );
  }

  displayUsuarioTecnico = (item: any): string => {
    return item ? `${item.nombres} ${item.apellidos}` : '';
  };

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

  toggleBase64(file: { showBase64: boolean }): void {
    file.showBase64 = !file.showBase64;
  }

  removeProducto(index: number): void {
    this.productosDataSource.data = [...this.productosDataSource.data.slice(0, index), ...this.productosDataSource.data.slice(index + 1)];
    this.listaProductos = [...this.productosDataSource.data];
    console.log('Producto eliminado, index:', index, this.productosDataSource.data);
  }

  removeFile(index: number): void {
    this.evidenciasDataSource.data = [...this.evidenciasDataSource.data.slice(0, index), ...this.evidenciasDataSource.data.slice(index + 1)];
    this.listaEvidencias = [...this.evidenciasDataSource.data];
    console.log('Evidencia eliminada, index:', index, this.evidenciasDataSource.data);
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

  seleccionarClienteId(id: number): void {
    const cliente = this.clientesFiltrados.find(x => x.id === id);
    if (cliente) {
      this.reporteServiciosForm.get('idCliente')?.setValue(cliente);
    }
  }

  onChangeIniciarServicio(event: any): void {
    const isChecked = event.checked;
    console.log('Toggle changed:', isChecked);

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Cambiarás el estatus a "En Seguimento" del reporte de servicio y se aplicará la fecha de inicio.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Obtener request.
        const formValue = this.reporteServiciosForm.value;
        const request: CambiarEstatusEnSeguimentoRequest = {
          id: this.IdReporteServicio,
          idEstatus: 3,
          fechaInicio: formValue.fechaInicio,
        };
        // Cambiar estatus.
        this.swalLoading.showLoading("Cambio de estatus Reporte de Solicitud", "Cambiando el estatus a 'En Seguimento'...");
        this.ReporteServicioService.CambiarEstatusEnSeguimento(request).subscribe({
          next: (response) => {
            if (response.success) {
              this.swalLoading.close();
              this.servicioIniciado = true;
              // Envio de correo.
              // try {
              //   this.EnvioCorreo();
              // } catch (error: any) {
              //   this.swalLoading.showError("Envio de correo", "Ocurrio un error al enviar el correo.");
              // }

              Swal.fire({
                title: '¡Cambio realizado!',
                text: `El estatus ha sido cambiado a "En Seguimento" y la fecha de inicio es ${request.fechaInicio}.`,
                icon: 'success',
                confirmButtonText: 'Ir a Seguimento',
              }).then((result) => {
                if (result.isConfirmed) {
                  // Solo se ejecuta si el botón "Aceptar" fue presionado
                  this.router.navigate(['/admin/seguimentos/lista']);
                }
              });
            }
            else {
              this.servicioIniciado = false;
              this.swalLoading.close();
              this.swalLoading.showError("Formulario inválido", response.message);
            }
          },
          error: (err) => {
            this.servicioIniciado = false;
            this.swalLoading.close();
            this.swalLoading.showError("Cambio de estatus Reporte de Solicitud", this.getErrorMessage(err));
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.servicioIniciado = false;
      }
    });
  }

  CalculatVenta() {
    //debugger;
    var Gasto = this.reporteServiciosForm.value.montoGasto;
    var Porcentaje = this.reporteServiciosForm.value.porcentaje / 100;
    var MontoGasto = Gasto / this.reporteServiciosForm.value.porcentaje;

    this.reporteServiciosForm.value.montoVenta = MontoGasto;
    this.MontoVenta = MontoGasto;
  }

  openVerEvidenciaModal(id: number = 0, file: any): void {
    const dialogRef = this.dialog.open(VerEvidenciaModalComponent, {
      // panelClass: 'modal-lg'
      data: { id: id, file: file },
      maxWidth: '90vh',
      maxHeight: '90vh',
      width: 'auto',
      height: 'auto',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }
}
