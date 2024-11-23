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
  displayedColumns: string[] = ['id', 'tipoSolicitud', 'cliente', 'titulo', 'usuarioCreacion', 'fechaCreacion', 'fechaInicio', 'estatus', 'editar'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.busquedaSolicitudes('');
  }

  busquedaSolicitudes(busqueda: string, numeroPagina: number = 1, cantidadPorPagina: number = 10) {
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
  }

  onClickNuevoSolicitud() {
    this.router.navigate(['admin/solicitudes/crear']);
  }

  fnEditarSolicitud(id: number) {
    this.router.navigate(['admin/solicitudes/editar', id]);
  }
}
