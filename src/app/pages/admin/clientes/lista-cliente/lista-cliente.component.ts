import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IconsModule } from '../../../../icons/icons.module';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.busquedaClientes('');
  }

  busquedaClientes(busqueda: string, numeroPagina: number = 1, cantidadPorPagina: number = 10) {
    // try {
    //   const request: BusquedaUsuarioRequest = {
    //     busqueda: busqueda,
    //     numeroPagina: numeroPagina,
    //     cantidadPorPagina: cantidadPorPagina,
    //   };

    //   this.usuarioService.Busqueda(request).subscribe({
    //     next: (response) => {
    //       this.dataSource.data = response.data;
    //     },
    //     error: (err) => {
    //       console.error('Error al cargar usuarios', err);
    //     }
    //   });
    // }
    // catch (ex) {

    // }
    this.dataSource.data = [];
  }

  onClickNuevoCliente() {
    this.router.navigate(['admin/clientes/crear']);
  }

  fnEditarCliente(id: number) {
    this.router.navigate(['admin/clientes/editar', id]);
  }
}
