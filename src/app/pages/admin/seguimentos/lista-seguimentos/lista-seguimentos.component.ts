import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IconsModule } from '../../../../icons/icons.module';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BusquedaGenericoRequest } from '../../../../models/requests/BusquedaGenericoRequest';
import { ReporteServicioService } from '../../../../services/reporte-servicio.service';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-lista-seguimentos',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    IconsModule,
    MatButtonModule,
    MatDivider,
  ],
  templateUrl: './lista-seguimentos.component.html',
  styleUrl: './lista-seguimentos.component.css'
})
export class ListaSeguimentosComponent implements OnInit {
  displayedColumns: string[] = ['seguimento'];
  dataSource = new MatTableDataSource<any>([]);

  router = inject(Router);
  reporteServicioService = inject(ReporteServicioService);

  ngOnInit(): void {
    this.busquedaSeguimentoActivo('');
  }

  fnAgregarSeguimento(id: number) {
    // this.router.navigate(['admin/solicitudes/editar', id]);
  }

  busquedaSeguimentoActivo(busqueda: string, numeroPagina: number = 1, cantidadPorPagina: number = 10) {
    try {
      const request: BusquedaGenericoRequest = {
        busqueda: busqueda,
        numeroPagina: numeroPagina,
        cantidadPorPagina: cantidadPorPagina,
      };

      this.reporteServicioService.BusquedaSeguimentoActivo(request).subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
        },
        error: (err) => {
          console.error('Error al cargar lista de seguimento', err);
        }
      });
    }
    catch (ex) {
      console.error('busquedaSeguimentoActivo', ex);
    }
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
