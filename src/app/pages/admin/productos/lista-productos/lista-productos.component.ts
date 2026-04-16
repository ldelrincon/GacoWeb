
import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CatalogosService } from '../../../../services/catalogos.service';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    FlexLayoutModule
  ],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'grupoProducto', 'codigo', 'producto', 'fechaCreacion', 'estatus', 'editar','eliminar'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  filtroForm: FormGroup;
  listaGrupos: any[] = [];
  originalData: any[] = [];

  length = 100; // Total de elementos (debe coincidir con tus datos)
  pageSize = 10; // Elementos por página
  pageSizeOptions: number[] = [5, 10, 20];
  pageNumber: number = 1; // Número de página ingresado

  constructor(private router: Router, private productoService: ProductoService, private swalLoading: LoadingService, private fb: FormBuilder, private catalogosService: CatalogosService) {
    this.filtroForm = this.fb.group({
      producto: [''],
      grupo: ['']
    });
  }
  ngOnInit(): void {
    this.cargarGrupos();
    this.busquedaProductos('');
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  cargarGrupos() {
    this.catalogosService.ListaCatGrupoProductos().subscribe({
      next: (response) => {
        this.listaGrupos = response.data;
      },
      error: (err) => {
        console.error('Error al cargar grupos', err);
      }
    });
  }

  busquedaProductos(busqueda: string, numeroPagina: number = 1, cantidadPorPagina: number = 100) {
    try {
      const request: BusquedaProductoRequest = {
        Descripcion: busqueda,
        numeroPagina: numeroPagina,
        cantidadPorPagina: cantidadPorPagina,
      };

      this.productoService.Busqueda(request).subscribe({
        next: (response) => {
          this.originalData = response.data || [];
          this.aplicarFiltros();
        },
        error: (err) => {
          console.error('Error al cargar Producto', err);
          this.originalData = [];
          this.dataSource.data = [];
        }
      });
    }
    catch (ex) {
      console.error('Error en busquedaProductos', ex);
      this.originalData = [];
      this.dataSource.data = [];
    }
  }

  aplicarFiltros() {
    const producto = (this.filtroForm.get('producto')?.value || '').toString().trim().toLowerCase();
    const grupo = (this.filtroForm.get('grupo')?.value || '').toString().trim();

    this.dataSource.data = this.originalData.filter(item => {
      const nombreProducto = item?.producto ? item.producto.toString().toLowerCase() : '';
      const nombreGrupo = item?.grupoProducto ? item.grupoProducto.toString() : '';
      return (
        (producto === '' || nombreProducto.includes(producto)) &&
        (grupo === '' || nombreGrupo === grupo)
      );
    });

    if (this.paginator) {
      this.paginator.firstPage();
    }
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
