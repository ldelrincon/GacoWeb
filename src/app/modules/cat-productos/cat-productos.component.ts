import { Component, OnInit, EventEmitter, Inject, ViewChild } from "@angular/core";
import { DatePipe, Location } from "@angular/common";
import { FormControl, Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { SweetService } from "../../core/services/sweet.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";

import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductoModel } from "@app/core/models/ProductosModel.model";
import { NavbarService } from "@app/core/services/navbar.service";
import { productosService } from "@app/core/services/productos.services";
//  import { selectRows } from "@swimlane/ngx-datatable";
import { Router } from "@angular/router";
import { ScopeService } from "@app/core/services/seguridad/scope.service";

@Component({
  selector: 'app-cat-productos',
  standalone: true,
  imports: [],
  templateUrl: './cat-productos.component.html',
  styleUrl: './cat-productos.component.scss'
})
export class CatProductosComponent {

  busquedaAvanzada: boolean = false;
  isModal: boolean = false;
  Search: string = "";
  pageIndex: number = 0;
  dataSource: MatTableDataSource<any>;
  pageLength: number = 10;
  totalRows: number = 0;
  // modCatRequisito: catRequisito = new catRequisito();
  dataSourceColumns: string[] = [
    "CodProducto",
    "Producto",
    "Acciones"
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  search: string = "";
  fechaHoy: Date = new Date();
  isBusquedaAvanzada: boolean = false;
  idGuidPantalla: any;
  // objPageScope: PageScope;
  // ObjClsModBuscadorPersonas: ClsModBuscadorPersonas = new ClsModBuscadorPersonas();
  constructor(
    private sweet: SweetService,
    public productosService: productosService,
    public dialog: MatDialog,
    public navbarService: NavbarService,
    private location: Location,
    public router: Router,
    private scope: ScopeService,
  ) {

    this.navbarService.setTitle('Personas','','','');
    //this.initPageScope();
  }

  ngOnInit(): void {
    this.pageIndex = 0;
    this.GetCatPersonas(this.pageIndex);
  }
  // async initPageScope() {
  //   try {
  //     let navigation = await this.router.getCurrentNavigation();
  //     if (navigation !== undefined || navigation !== null) {
  //       this.idGuidPantalla = navigation.extras.state.id;
  //     }

  //     this.iniObjPageScope();
  //   } catch {

  //     let data: any = await this.location.getState();
  //     if (data !== undefined || data !== null) {
  //       this.idGuidPantalla = data.id;

  //       this.iniObjPageScope();
  //     }

  //   }
  // }
  // iniObjPageScope() {
  //   this.objPageScope = new PageScope(
  //     this.idGuidPantalla,
  //     this.scope
  //   );
  // }

  cambiarTrim(event: any) {


  }

  //Cargar resgistros ----------
  async GetCatPersonas(pg) {
    try {

      // this.ObjClsModBuscadorPersonas.Search = this.search.trim();
      // this.ObjClsModBuscadorPersonas.Page = pg + 1;
      // this.ObjClsModBuscadorPersonas.RowNumber = this.pageLength;
      // let objModBusqueda = this.ObjClsModBuscadorPersonas;

      let response = await this.productosService
        .CargarProductos()
        .toPromise();

      let result: any = response;
      let data: any[] = result.object;
      this.totalRows = result.cant;

      if (data && data.length > 0) {

        this.dataSource = new MatTableDataSource(
          this.addTableRowExpanded(data)
        );

      //  this.initPaginador(this.paginator);

      } else {

        if (this.dataSource.data) this.dataSource.data = [];
      }

    } catch (error) {
      console.log('Error!! : ', error);

      this.dataSource.data = [];
      this.sweet.showSwalError(
        "¡Lo siento!",
        "Estamos teniendo algunos problemas, por favor inténtelo más tarde."
      );
    }

  }

  //Agregar nuevo registro ----------
  addTableRowExpanded(data: Array<any>) {
    return data.map((x) => {
      let detail = [
        {
          Idproducto: x.IdProducto,
          CodProducto: x.codProducto,
          Producto: x.Producto,
        },
      ];

      return Object.assign(x, {
        detail: detail,
        isExpanded: true,
      });
    });
  }
  //Modificar registro ----------

//Modificar registro ----------
// async editarRegistro(row) {
//   let idCatPersona = row.idPersona
//   let response = await this.personasService
//       .GetPersonasIdCliente(idCatPersona)
//       .toPromise();
//     let result: any = response;
//     let data: any[] = result.object[0];

//       const modalCatPersona = this.dialog.open(NuevoPersonasComponent,{
//         data: {
//           dataSource: data,
//           infoRow: data,
//           editar: 1
//         },
//         disableClose: true,
//         width: "70vw"
//       });

//       modalCatPersona.afterClosed().subscribe(resp => {
//         if (resp != undefined && resp.ev === "CARGA") {
//           this.pageIndex = 0;
//           this.GetCatPersonas(0);
//         }
//       });

// }


  //Busqueda simple ----------
  // buscador() {
  //   this.pageIndex = 0
  //   this.GetCatPersonas(0);
  // }
  // busqueda() {
  //   const modalBusquedaPersona = this.dialog.open(BusquedaPersonasComponent, {
  //     disableClose: true,
  //     // height: "500px",
  //     width: "70vw",
  //     data: this.ObjClsModBuscadorPersonas
  //   });

  // // Advanced person search
  //   modalBusquedaPersona.afterClosed().subscribe((resp) => {
  //     if (resp.BusquedaAvanzada) {
  //       this.ObjClsModBuscadorPersonas.Search = "";
  //       this.ObjClsModBuscadorPersonas = resp.ObjClsModBuscadorPersonas;
  //     this.search = ""; // Clean basic search
  //     this.pageIndex = 0;
  //     this.GetCatPersonas(0);
  //       this.FiltrosBusquedaAvanzada(this.ObjClsModBuscadorPersonas, resp.seleccionado);
  //     }
  //   });
  // }

  // FiltrosBusquedaAvanzada(obj: ClsModBuscadorPersonas, seleccionado) {
  //   var codigoPersona = "Código de cliente: " + obj.CodigoPersona + ", ",
  //     nombrePersona = "Nombre: " + obj.NombrePersona + ", ",
  //     rfc = "RFC: " + obj.Rfc + ", ",
  //     sel = "Tipo de solicitante: " + seleccionado;

  //   this.search = (obj.CodigoPersona != "" ? codigoPersona : "") + (obj.NombrePersona != "" ? nombrePersona : "") + (obj.Rfc != "" ? rfc : "") + (seleccionado != "" ? sel : "");
  //   var ultimoPosicion = this.search[this.search.length - 2];
  //   this.search = ultimoPosicion != "," ? this.search : this.search.substring(0, this.search.length - 2);
  // }

  // limpiarBuscador() {
  //   this.search = "";
  //   this.ObjClsModBuscadorPersonas.CodigoPersona = "";
  //   this.ObjClsModBuscadorPersonas.NombrePersona = "";
  //   this.ObjClsModBuscadorPersonas.Rfc = "";
  //   this.ObjClsModBuscadorPersonas.IdTipoSolicitante = 0;
  //   this.pageIndex=0;
  //   this.GetCatPersonas(0);
  // }
  // //--------------------

  // //Busqueda avanzada ----------
  // busquedaAvan(event) {
  //   if (event != null && event) {
  //     this.pageIndex = 0;
  //     this.GetCatPersonas(0);
  //   }
  // }

  // limpiarBusquedaAvz() {
  //   this.pageIndex = 0;
  //   this.GetCatPersonas(0);
  // }
  // //--------------------

  // //Metodos para abrir y cerrar componente de busqueda avanzada ----------
  // abrirBusquedaAvanzada() {
  //   this.busquedaAvanzada = true;
  // }

  // cerrarBusquedaAvanzada() {
  //   this.busquedaAvanzada = false;
  //   this.pageIndex = 0;
  //   this.GetCatPersonas(0);
  // }
  // //--------------------


  // onChangePage($event) {
  //   this.pageIndex = $event.pageIndex;
  //   this.pageLength = $event.pageSize;
  //   this.GetCatPersonas(this.pageIndex);
  // }

  // //key enter folio ----------
  // onSearchEnter($event?: any) {
  //   this.pageIndex = 0;
  //   this.pageLength = 10;
  //   this.GetCatPersonas(this.pageIndex);
  // }


  // eliminarRegistros(row) {
  //   let idCatPersona = row.idPersona
  //   this.sweet.showSwalQuestionN2('¿Eliminar registro?').then((resp) => {
  //     if (resp && resp.value) {
  //       this.eliminar(idCatPersona);
  //     }
  //   });
  // }

  // eliminar(idCatPersona) {
  //   this.personasService.DeletePersona(idCatPersona).subscribe(
  //     (response) => {
  //       if (!response.isError) {
  //         this.pageIndex = 0;
  //         this.GetCatPersonas(0);
  //         this.sweet.showSwalExito("", `Se eliminó correctamente`);
  //       }
  //     },
  //     (error) => {
  //       console.log('Error!! : ', error);
  //     }
  //   );
  // }

  // _keyUpNumber(event: any) {

  //   const pattern = /[0-9]/;
  //   let inputChar = String.fromCharCode(event.charCode);

  //   if (!pattern.test(inputChar)) {
  //     // invalid character, prevent input
  //     event.preventDefault();
  //   }
  // }

  // esp(event: any, num: any) {
  //   var Letras = event.target.value.replace(/[^0-9]+/g, "");
  //   if (num == 1) {
  //     // this.modCatRequisito.ValorMinimo = Letras;
  //   } else if (num == 2) {
  //     // this.modCatRequisito.ValorMaximo = Letras;
  //   }
  // }

  // //Metodo para abrir modal de agregar/modificar registro ----------
  // abrirModal() {
  //   const modalCatPersona = this.dialog.open(NuevoPersonasComponent, {
  //     disableClose: true,
  //     // height: "500px",
  //     width: "70vw",
  //   });

  //   modalCatPersona.afterClosed().subscribe((resp) => {
  //     if (resp != undefined && resp.ev === "CARGA") {
  //       this.pageIndex = 0;
  //       this.GetCatPersonas(0);
  //     }
  //   });
  // }
  // //--------------------

  // initPaginador(paginator: MatPaginator) {
  //   paginator._intl.firstPageLabel = 'INICIO';
  //   paginator._intl.itemsPerPageLabel = 'Registros por página';
  //   paginator._intl.lastPageLabel = 'ÚLTIMO';
  //   paginator._intl.nextPageLabel = 'SIGUIENTE';
  //   paginator._intl.previousPageLabel = 'ANTERIOR';
  //   this.paginator._intl.getRangeLabel = (
  //     page: number,
  //     pageSize: number,
  //     length: number
  //   ) => {
  //     const start = page * pageSize + 1;
  //     const end = (page + 1) * pageSize;

  //     return `Mostrando registro(s) de  ${start} al  ${end} de un total ${length} registro(s)`;
  //   };
  // }

  // _keyUpAlfanumerico(event: any) {
  //   const pattern = /^[A-Za-zÁÄÉËÍÏÓÖÚÜáäéëíïóöúüñÑ ]+$/g;
  //   let inputChar = String.fromCharCode(event.charCode);

  //   if (!pattern.test(inputChar)) {
  //     // invalid character, prevent input
  //     event.preventDefault();
  //   }
  // }
}
