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
    MatButtonModule
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

  length = 100; // Total de elementos (debe coincidir con tus datos)
  pageSize = 10; // Elementos por página
  pageSizeOptions: number[] = [5, 10, 20];
  pageNumber: number = 1; // Número de página ingresado

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.busquedaSolicitudes('');
  }

  busquedaSolicitudes(busqueda: string, numeroPagina: number = 1, cantidadPorPagina: number = 10) {
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

  fnEstatusReporteServicio(id: number) {
    let css: string = '';
    if (id) {
      switch (id) {
        case 1:
          css = 'bg-light-success text-success';
          break;
        case 2:
          css = 'bg-light-error text-error';
          break;
        case 3:
          css = 'bg-light-accent text-accent';
          break;
        default: break;
      }
    }
    return css;
  }
}
