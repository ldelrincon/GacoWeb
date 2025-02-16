import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IconsModule } from '../../../../icons/icons.module';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { DefaultResponse } from '../../../../models/responses/DefaultResponse';
import { BusquedaGastoRequest } from '../../../../models/requests/gastos/BusquedaGastoRequest';
import { GastoService } from '../../../../services/gasto.service';

@Component({
  selector: 'app-lista-gastos',
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
  templateUrl: './lista-gastos.component.html',
  styleUrl: './lista-gastos.component.css'
})
export class ListaGastosComponent implements OnInit {
  displayedColumns: string[] = ['usuario', 'factura', 'total', 'productos', 'fechaCreacion', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  length = 100; // Total de elementos (debe coincidir con tus datos)
  pageSize = 10; // Elementos por página
  pageSizeOptions: number[] = [5, 10, 20];
  pageNumber: number = 1; // Número de página ingresado

  private router = inject(Router);
  private gastoService = inject(GastoService);
  private swalLoading = inject(LoadingService);

  ngOnInit(): void {
    this.busquedaGastos('');
  }

  busquedaGastos(busqueda: string, numeroPagina: number = 1, cantidadPorPagina: number = 10) {
    try {
      const request: BusquedaGastoRequest = {
        busqueda: busqueda,
        numeroPagina: numeroPagina,
        cantidadPorPagina: cantidadPorPagina,
      };

      this.gastoService.Busqueda(request).subscribe({
        next: (response: DefaultResponse) => {
          this.dataSource.data = response.data;
        },
        error: (err: any) => {
          console.error('Error al cargar gastos', err);
        }
      });
    }
    catch (ex) {

    }
    this.dataSource.data = [];
  }

  onClickNuevoGasto() {
    this.router.navigate(['admin/gastos/crear']);
  }

  fnEditarGasto(id: number) {
    this.router.navigate(['admin/gastos/editar', id]);
  }

  busquedaGastosPage(event: PageEvent) {
    try {
      this.pageNumber = event.pageIndex + 1;
      const request: BusquedaGastoRequest = {
        busqueda: '',
        numeroPagina: this.pageNumber,
        cantidadPorPagina: 10,
      };

      this.gastoService.Busqueda(request).subscribe({
        next: (response: DefaultResponse) => {
          this.dataSource.data = response.data;
        },
        error: (err: any) => {
          console.error('Error al cargar gastos', err);
        }
      });
    }
    catch (ex) {

    }
    this.dataSource.data = [];
  }

  EliminarGasto(id: number) {
    this.gastoService.EliminarGasto(id).subscribe({
      next: (response: DefaultResponse) => {
        if (response.success) {
          this.swalLoading.showSuccess("Eliminar gastos", "Gastos eliminado correctamente");
          this.busquedaGastos('');
        }
      },
      error: (err: any) => {
        console.error('Error al eliminar producto', err);
      }
    });
  }
}
