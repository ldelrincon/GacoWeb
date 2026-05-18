import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { IconsModule } from '../../../../icons/icons.module';
import { VentaService } from '../../../../services/venta.service';
import { LoadingService } from '../../../../services/loading.service';
import { BusquedaReporteFiltrosServicioRequest } from '../../../../models/requests/reporte-solicitud/BusquedaReporteFiltrosServicioRequest';
import { BusquedaFiltrosRequest } from '../../../../models/requests/reporte-solicitud/BusquedaFiltrosRequest';
import { VentaModalComponent } from '../../../components/venta-modal/venta-modal.component';

interface VentaResponse {
  IdVentas: number;
  Descripcion: string;
  IdCliente: number;
  Cliente: string;
  FechaVenta: string;
  Cantidad: number;
  Precio: number;
  Subtotal: number;
  Iva: number;
  Total: number;
  Estatus: number;
  EstatusStr: string;
  Observaciones: string;
  FechaCreacion: string;
  IdUsuarioCreacion: number;
}

@Component({
  selector: 'app-lista-ventas',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    IconsModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {
  displayedColumns: string[] = ['cliente', 'fechaVenta', 'descripcion', 'cantidad', 'precio', 'subtotal', 'iva', 'total', 'editar'];
  dataSource = new MatTableDataSource<VentaResponse>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  filtroForm: FormGroup = new FormGroup({});
  listaEstatus = [
    { id: '', nombre: 'Todos' },
    { id: 4, nombre: 'Facturado' },
    { id: 5, nombre: 'Terminado' },
    { id: 11, nombre: 'Pagado' },
    { id: 12, nombre: 'No Pagado' }
  ];

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageNumber = 1;

  constructor(
    private fb: FormBuilder,
    private ventaService: VentaService,
    private swalLoading: LoadingService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      cliente: [''],
      fechaDesde: [null],
      fechaHasta: [null],
      estatus: ['']
    });

    this.loadVentas();
  }

  loadVentas(numeroPagina: number = 1, cantidadPorPagina: number = 10): void {
    const filtros: BusquedaFiltrosRequest = {
      cliente: this.filtroForm.get('cliente')?.value || '',
      fechaInicio: this.filtroForm.get('fechaDesde')?.value || null,
      fechaFin: this.filtroForm.get('fechaHasta')?.value || null,
      estatus: this.filtroForm.get('estatus')?.value || null
    };

    const request: BusquedaReporteFiltrosServicioRequest = {
      busqueda: filtros,
      numeroPagina,
      cantidadPorPagina
    };

    this.swalLoading.showLoading();
    this.ventaService.BusquedaFiltrosVenta(request).subscribe({
      next: (response) => {
        console.log('Ventas response:', response);
        const ventas = this.mapVentasData(response.data);
        this.dataSource.data = ventas;
        this.length = ventas.length;
        this.swalLoading.close();
      },
      error: (err) => {
        console.error('Error al cargar ventas', err);
        this.swalLoading.close();
      }
    });
  }

  private mapVentasData(data: any): VentaResponse[] {
    const resolve = (item: any, ...keys: string[]) => {
      for (const key of keys) {
        if (item?.[key] !== undefined && item?.[key] !== null) {
          return item[key];
        }
      }
      return undefined;
    };

    let items: any[] = [];

    if (Array.isArray(data)) {
      items = data;
    } else if (Array.isArray(data?.data)) {
      items = data.data;
    } else if (Array.isArray(data?.ventas)) {
      items = data.ventas;
    } else if (Array.isArray(data?.items)) {
      items = data.items;
    } else if (Array.isArray(data?.lista)) {
      items = data.lista;
    } else if (Array.isArray(data?.data?.data)) {
      items = data.data.data;
    }

    return (items || []).map((item: any) => ({
      IdVentas: resolve(item, 'IdVentas', 'idVentas', 'idVenta', 'id') ?? 0,
      Descripcion: resolve(item, 'Descripcion', 'descripcion', 'Detalle', 'detalle') ?? '',
      IdCliente: resolve(item, 'IdCliente', 'idCliente', 'id_cliente') ?? 0,
      Cliente: resolve(item, 'Cliente', 'cliente', 'NombreCliente', 'nombreCliente', 'clienteNombre') ?? '',
      FechaVenta: resolve(item, 'FechaVenta', 'fechaVenta', 'fecha', 'Fecha') ?? '',
      Cantidad: resolve(item, 'Cantidad', 'cantidad') ?? 0,
      Precio: resolve(item, 'Precio', 'precio', 'PrecioUnitario', 'precioUnitario') ?? 0,
      Subtotal: resolve(item, 'Subtotal', 'subtotal', 'SubTotal') ?? 0,
      Iva: resolve(item, 'Iva', 'iva', 'IVA') ?? 0,
      Total: resolve(item, 'Total', 'total', 'TotalVenta', 'totalVenta') ?? 0,
      Estatus: resolve(item, 'Estatus', 'estatus', 'IdEstatus', 'idEstatus') ?? 0,
      EstatusStr: resolve(item, 'EstatusStr', 'estatusStr', 'EstatusDescripcion', 'estatusDescripcion', 'estatusTexto') ?? '',
      Observaciones: resolve(item, 'Observaciones', 'observaciones') ?? '',
      FechaCreacion: resolve(item, 'FechaCreacion', 'fechaCreacion', 'Fecha', 'fecha') ?? '',
      IdUsuarioCreacion: resolve(item, 'IdUsuarioCreacion', 'idUsuarioCreacion', 'IdUsuario', 'idUsuario') ?? 0
    }));
  }

  applyFilters(): void {
    this.loadVentas(1, this.pageSize);
  }

  limpiarFiltros(): void {
    this.filtroForm.reset({
      cliente: '',
      fechaDesde: null,
      fechaHasta: null,
      estatus: ''
    });
    this.loadVentas(1, this.pageSize);
  }

  onClickNuevaVenta(): void {
    const dialogRef = this.dialog.open(VentaModalComponent, {
      width: '560px',
      panelClass: 'modal-lg'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.handleVentaDialogResult(result);
      }
    });
  }

  fnEditarVenta(id: number): void {
    const venta = this.dataSource.data.find(item => item.IdVentas === id);
    if (!venta) {
      console.error('Venta no encontrada para edición:', id);
      return;
    }

    const dialogRef = this.dialog.open(VentaModalComponent, {
      width: '560px',
      panelClass: 'modal-lg',
      data: {
        IdVentas: venta.IdVentas,
        Descripcion: venta.Descripcion,
        IdCliente: venta.IdCliente,
        Cliente: venta.Cliente,
        FechaVenta: venta.FechaVenta,
        Cantidad: venta.Cantidad,
        Precio: venta.Precio,
        Estatus: venta.Estatus,
        Observaciones: venta.Observaciones
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.handleVentaDialogResult(result);
      }
    });
  }

  private handleVentaDialogResult(result: any): void {
    const payload = {
      ...result,
      IdVentas: result.IdVentas ?? result.id ?? null,
      idCliente: result.idCliente?.id ?? result.idCliente
    };

    this.ventaService.NuevoRegistro(payload).subscribe({
      next: () => {
        this.loadVentas(1, this.pageSize);
      },
      error: (err) => {
        console.error('Error guardando la venta', err);
      }
    });
  }

  busquedaVentasPage(event: PageEvent): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadVentas(this.pageNumber, this.pageSize);
  }
}
