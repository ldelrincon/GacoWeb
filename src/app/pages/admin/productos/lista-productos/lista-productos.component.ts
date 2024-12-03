
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IconsModule } from '../../../../icons/icons.module';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BusquedaProductoRequest } from './../../../../models/requests/productos/BusquedaProductoRequest';
import { ProductoService } from '../../../../services/producto.service';

@Component({
  selector: 'app-lista-productos',
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
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'grupoProducto', 'codigo', 'producto', 'fechaCreacion', 'estatus', 'editar'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router: Router, private productoService: ProductoService) { }
  ngOnInit(): void {
    this.busquedaProductos('');
  }

  busquedaProductos(busqueda: string, numeroPagina: number = 1, cantidadPorPagina: number = 10) {
    try {
      const request: BusquedaProductoRequest = {
        busqueda: busqueda,
        numeroPagina: numeroPagina,
        cantidadPorPagina: cantidadPorPagina,
      };

      this.productoService.Busqueda(request).subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
        },
        error: (err) => {
          console.error('Error al cargar Producto', err);
        }
      });
    }
    catch (ex) {

    }
    this.dataSource.data = [];
  }

  onClickNuevoProducto() {
    this.router.navigate(['admin/productos/crear']);
  }

  fnEditarProducto(id: number) {
    this.router.navigate(['admin/productos/editar', id]);
  }
}
