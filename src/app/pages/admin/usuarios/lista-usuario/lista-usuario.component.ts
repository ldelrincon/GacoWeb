import { BusquedaUsuarioRequest } from '../../../../models/requests/usuario/BusquedaUsuarioRequest';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { IconsModule } from '../../../../icons/icons.module';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../../services/usuario.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-lista-usuario',
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
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.css'
})
export class ListaUsuarioComponent implements OnInit {
  displayedColumns: string[] = ['id', 'tipoUsuario', 'correo', 'nombreCompleto', 'fechaCreacion', 'estatus', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(public usuarioService: UsuarioService, private router: Router, private swalLoading: LoadingService) { }
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
      const request: BusquedaUsuarioRequest = {
        busqueda: busqueda,
        numeroPagina: numeroPagina,
        cantidadPorPagina: cantidadPorPagina,
      };

      this.usuarioService.Busqueda(request).subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
        },
        error: (err) => {
          console.error('Error al cargar usuarios', err);
        }
      });
    }
    catch (ex) {

    }
  }

  onClickNuevoUsuario() {
    this.router.navigate(['admin/usuarios/crear']);
  }

  fnEditarUsuario(id: number) {
    this.router.navigate(['admin/usuarios/editar', id]);
  }

  EliminarUsuario(id: number) {
    this.usuarioService.EliminarUsuario(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.swalLoading.showSuccess("Eliminar usuario", "Usuario eliminado correctamente");
          this.busquedaUsuarios('');
        }
      },
      error: (err) => {
        console.error('Error al eliminar usuario', err);
      }
    });
  }
}
