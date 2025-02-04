
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IconsModule } from '../../../../icons/icons.module';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BusquedaProductoRequest } from './../../../../models/requests/productos/BusquedaProductoRequest';
import { ProductoService } from '../../../../services/producto.service';
import { LoadingService } from '../../../../services/loading.service';

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
  displayedColumns: string[] = ['id', 'grupoProducto', 'codigo', 'producto', 'fechaCreacion', 'estatus', 'editar','eliminar'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  length = 100; // Total de elementos (debe coincidir con tus datos)
  pageSize = 10; // Elementos por página
  pageSizeOptions: number[] = [5, 10, 20];
  pageNumber: number = 1; // Número de página ingresado

  constructor(private router: Router, private productoService: ProductoService, private swalLoading: LoadingService) { }
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

  busquedaProductosPage(event: PageEvent) {
    try {
      this.pageNumber = event.pageIndex + 1;
      const request: BusquedaProductoRequest = {
        busqueda: '',
        numeroPagina: this.pageNumber,
        cantidadPorPagina: 10,
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

  EliminarProducto(id: number) {
    this.productoService.EliminarProducto(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.swalLoading.showSuccess("Eliminar producto", "Producto eliminado correctamente");
          this.busquedaProductos('');
        }
      },
      error: (err) => {
        console.error('Error al eliminar producto', err);
      }
    });
  }
}
