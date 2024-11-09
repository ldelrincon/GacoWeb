import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// services
import { ApiService } from "./api.service";
import { EncryptService } from "./common/encrypt.service";

// // models
import { Comentarios } from "../models/comentarios.model";

const routes = {
  Productos: "/Productos",
};

@Injectable({
  providedIn: "root",
})
export class productosService {
  constructor(
    private apiService: ApiService,
    private encryptService: EncryptService
  ) {}

  // FiltrarComentarios(IdTablaRelacion: number, IdRelacion: number, pagina: number, tipo: number = 0): Observable<any> {
  //   // tslint:disable-next-line: max-line-length
  //   return this.apiService.get(`${routes.Productos}/FiltrarComentarios?IdTablaRelacion=${IdTablaRelacion}&IdRelacion=${IdRelacion}&pagina=${pagina}&tipo=${tipo}`);
  // }

  CargarProductos(): Observable<any>  {
    // tslint:disable-next-line: max-line-length
    return this.apiService.get(`${routes.Productos}/CargarComentarios`);
  }
  // EliminarComentario(idComentario: number): Observable<any> {
  //   // tslint:disable-next-line: max-line-length
  //   return this.apiService.postApi(`${routes.Productos}/EliminarComentarios?idComentario=${idComentario}`);
  // }
}
