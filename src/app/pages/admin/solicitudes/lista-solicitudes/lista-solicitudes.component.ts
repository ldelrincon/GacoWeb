import { ReporteServicioService } from './../../../../services/reporte-servicio.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IconsModule } from '../../../../icons/icons.module';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BusquedaReporteServicioRequest } from '../../../../models/requests/reporte-solicitud/BusquedaReporteServicioRequest';
import { LoadingService } from '../../../../services/loading.service';
import { UtilidadesService } from '../../../../services/utilidades.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // o MatMomentDateModule si usas moment.js
import { BusquedaReporteFiltrosServicioRequest } from '../../../../models/requests/reporte-solicitud/BusquedaReporteFiltrosServicioRequest';
import { BusquedaFiltrosRequest } from '../../../../models/requests/reporte-solicitud/BusquedaFiltrosRequest';

@Component({
  selector: 'app-lista-solicitudes',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    IconsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './lista-solicitudes.component.html',
  styleUrl: './lista-solicitudes.component.css'
})
export class ListaSolicitudesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'tipoSolicitud', 'cliente', 'titulo', 'totalGasto', 'total', 'usuarioCreacion', 'fechaCreacion', 'fechaInicio', 'estatus', 'editar'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  private reporteServicioService = inject(ReporteServicioService);

  private swalLoading = inject(LoadingService);
  utilidadesService = inject(UtilidadesService);

  length = 100; // Total de elementos (debe coincidir con tus datos)
  pageSize = 10; // Elementos por página
  pageSizeOptions: number[] = [5, 10, 20];
  pageNumber: number = 1; // Número de página ingresado

  filtroForm: FormGroup = new FormGroup({});

  listaEstatus = [
    { id: 1, nombre: 'Nuevo' },
  ];

    listaTipoActividad=[
    {id:1, nombre:'Servicio'},
    {id:2, nombre:'Proyecto'},
    {id:3, nombre:'Cotización'}
  ];

  constructor(private router: Router, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      cliente: [''],
      fechaInicio: [null],
      fechaFin: [null],
      estatus: [''],
      tipoSolicitud: ['']
    });

    console.log(this.filtroForm.value);
    this.busquedaSolicitudes('');
  }

  busquedaSolicitudes(busqueda: string, numeroPagina: number = 1, cantidadPorPagina: number = 100) {
    try {
      const request: BusquedaReporteServicioRequest = {
        busqueda: busqueda,
        numeroPagina: numeroPagina,
        cantidadPorPagina: cantidadPorPagina,
      };

      this.swalLoading.showLoading();
      this.reporteServicioService.Busqueda(request).subscribe({
        next: (response) => {
          //debugger;
          this.dataSource.data = response.data;
          this.swalLoading.close();
        },
        error: (err) => {
          console.error('Error al cargar usuarios', err);
          this.swalLoading.close();
        }
      });
    }
    catch (ex) {
      console.error(ex);
      this.swalLoading.close();
    }
  }

  busquedaSolicitudesFiltros(busqueda: any, numeroPagina: number = 1, cantidadPorPagina: number = 100) {
    try {
      const request: BusquedaReporteFiltrosServicioRequest = {
        busqueda: busqueda,
        numeroPagina: numeroPagina,
        cantidadPorPagina: cantidadPorPagina,
      };

      this.swalLoading.showLoading();
      this.reporteServicioService.BusquedaFiltros(request).subscribe({
        next: (response) => {
          //debugger;
          this.dataSource.data = response.data;
          this.swalLoading.close();
        },
        error: (err) => {
          console.error('Error al cargar usuarios', err);
          this.swalLoading.close();
        }
      });
    }
    catch (ex) {
      console.error(ex);
      this.swalLoading.close();
    }
  }

  selectedRowIndex: number | null = null;

  onRowClicked(row: any): void {
    this.selectedRowIndex = row.id;
  }

  busquedaSolicitudesPage(event: PageEvent) {
    try {
      this.pageNumber = event.pageIndex + 1;
      const request: BusquedaReporteServicioRequest = {
        busqueda: '',
        numeroPagina: this.pageNumber,
        cantidadPorPagina: 10,
      };

      this.swalLoading.showLoading();
      this.reporteServicioService.Busqueda(request).subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
          this.swalLoading.close();
        },
        error: (err) => {
          console.error('Error al cargar usuarios', err);
          this.swalLoading.close();
        }
      });
    }
    catch (ex) {
      console.error(ex);
      this.swalLoading.close();
    }
  }

  onClickNuevoSolicitud() {
    this.router.navigate(['admin/solicitudes/crear']);
  }

  fnEditarSolicitud(id: number) {
    this.router.navigate(['admin/solicitudes/editar', id]);
  }

  aplicarFiltros() {
    const { cliente, fechaInicio, fechaFin, estatus, tipoSolicitud } = this.filtroForm.value;

    const busqueda: BusquedaFiltrosRequest = {
      cliente: cliente || null,
      fechaInicio: fechaInicio || null,
      fechaFin: fechaFin || null,
      estatus: estatus || null,
      tipoSolicitud: tipoSolicitud || null
    };

    console.log(busqueda);
    this.busquedaSolicitudesFiltros(busqueda);
  }
}
