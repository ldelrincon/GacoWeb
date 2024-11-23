
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { IconsModule } from '../../icons/icons.module';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
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
  providers: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})


export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'tipoUsuario', 'correo', 'nombreCompleto', 'fechaCreacion', 'estatus', 'editar'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(public usuarioService: UsuarioService, private router: Router) { }
  ngOnInit(): void {
    this.busquedaUsuarios('');
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  busquedaUsuarios(busqueda: string, numeroPagina: number = 1, cantidadPorPagina: number = 10) {
    try {
      // const request: BusquedaUsuarioRequest = {
      //   busqueda: busqueda,
      //   numeroPagina: numeroPagina,
      //   cantidadPorPagina: cantidadPorPagina,
      // };

      // this.usuarioService.Busqueda(request).subscribe({
      //   next: (response) => {
      //     this.dataSource.data = response.data;
      //   },
      //   error: (err) => {
      //     console.error('Error al cargar usuarios', err);
      //   }
      // });
    }
    catch (ex) {

    }
  }

  onClickNuevoProducto() {
    this.router.navigate(['admin/usuarios/crear']);
  }

  fnEditarProducto(id: number) {
    this.router.navigate(['admin/usuarios/editar', id]);
  }
}
