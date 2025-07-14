import { ClienteService } from './../../../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IconsModule } from '../../../../icons/icons.module';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BusquedaClienteRequest } from '../../../../models/requests/clientes/BusquedaClienteRequest';
import { LoadingService } from '../../../../services/loading.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BusquedaFiltrosClienteRequest } from '../../../../models/requests/clientes/BusquedaFiltrosClienteRequest';
import { SweetService } from '../../../../core/services/sweet.service';

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
    MatButtonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './lista-cliente.component.html',
  styleUrl: './lista-cliente.component.css'
})
export class ListaClienteComponent implements OnInit {
  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'correo', 'rfc', 'fechaCreacion', 'estatus', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  length = 100; // Total de elementos (debe coincidir con tus datos)
  pageSize = 10; // Elementos por página
  pageSizeOptions: number[] = [5, 10, 20];
  pageNumber: number = 1; // Número de página ingresado

  filtroForm: FormGroup = new FormGroup({});
  private fb = inject(FormBuilder);

  constructor(private router: Router, private clienteService: ClienteService,
     private sweet: SweetService,
    private swalLoading: LoadingService) { }

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      nombre: [''],
      rfc: [''],
    });

    const busqueda: BusquedaFiltrosClienteRequest = {
      nombre: '',
      rfc: '',
    };

    this.busquedaClientes(busqueda);
  }

  aplicarFiltros() {
    const { nombre, rfc } = this.filtroForm.value;

    const busqueda: BusquedaFiltrosClienteRequest = {
      nombre: nombre || null,
      rfc: rfc || null,
    };

    this.busquedaClientes(busqueda);
  }

  busquedaClientes(busqueda: any, numeroPagina: number = 1, cantidadPorPagina: number = 100) {
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

  selectedRowIndex: number | null = null;

  onRowClicked(row: any): void {
    this.selectedRowIndex = row.id;
  }

  busquedaClientesPagiandor(event: PageEvent) {
    try {
      this.pageNumber = event.pageIndex + 1;
      const request: BusquedaClienteRequest = {
        busqueda: this.filtroForm.value,
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

  EliminarClientes(id: number) {
    this.clienteService.EliminarCliente(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.swalLoading.showSuccess("Eliminar cliente", "cliente eliminado correctamente");
         // this.busquedaClientes('');
           const busqueda: BusquedaFiltrosClienteRequest = {
            nombre: '',
            rfc: '',
          };

          this.busquedaClientes(busqueda);
        }
      },
      error: (err) => {
        console.error('Error al eliminar cliente', err);
      }
    });
  }

   validacionModalRevision(id: number) {
    this.sweet.showSwalQuestion(
      "Eliminar",
      "¿ Desea eliminar el cliente seleccionado?"
    ).then((result) => {
      if (result['isConfirmed']) {

       this.EliminarClientes(id);
    //      const busqueda: BusquedaFiltrosClienteRequest = {
    //       nombre: '',
    //       rfc: '',
    //     };

    // this.busquedaClientes(busqueda);
      }
    })
  }
}
