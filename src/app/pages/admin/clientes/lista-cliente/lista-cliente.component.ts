import { ClienteService } from './../../../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent  } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IconsModule } from '../../../../icons/icons.module';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BusquedaClienteRequest } from '../../../../models/requests/clientes/BusquedaClienteRequest';

@Component({
  selector: 'app-lista-cliente',
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
  templateUrl: './lista-cliente.component.html',
  styleUrl: './lista-cliente.component.css'
})
export class ListaClienteComponent implements OnInit {
  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'correo', 'rfc', 'fechaCreacion', 'estatus', 'editar'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  length = 100; // Total de elementos (debe coincidir con tus datos)
  pageSize = 10; // Elementos por página
  pageSizeOptions: number[] = [5, 10, 20];
  pageNumber: number = 1; // Número de página ingresado

  constructor(private router: Router, private clienteService: ClienteService) { }
  ngOnInit(): void {
    this.busquedaClientes('');
  }

  busquedaClientes(busqueda: string, numeroPagina: number = 1, cantidadPorPagina: number = 10) {
    try {
      const request: BusquedaClienteRequest = {
        busqueda: busqueda,
        numeroPagina: numeroPagina,
        cantidadPorPagina: cantidadPorPagina,
      };

      this.clienteService.Busqueda(request).subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
        },
        error: (err) => {
          console.error('Error al cargar cliente', err);
        }
      });
    }
    catch (ex) {

    }
    this.dataSource.data = [];
  }

  busquedaClientesPagiandor(event: PageEvent) {
    try {
      this.pageNumber = event.pageIndex + 1;
      const request: BusquedaClienteRequest = {
        busqueda: '',
        numeroPagina: this.pageNumber,
        cantidadPorPagina: 10,
      };

      this.clienteService.Busqueda(request).subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
        },
        error: (err) => {
          console.error('Error al cargar cliente', err);
        }
      });
    }
    catch (ex) {

    }
    this.dataSource.data = [];
  }

  onClickNuevoCliente() {
    this.router.navigate(['admin/clientes/crear']);
  }

  fnEditarCliente(id: number) {
    this.router.navigate(['admin/clientes/editar', id]);
  }
}
