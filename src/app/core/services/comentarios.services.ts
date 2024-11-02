import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// services
import { ApiService } from "./api.service";
import { EncryptService } from "./common/encrypt.service";

// // models
import { Comentarios } from "../models/comentarios.model";

const routes = {
  comentarios: "/Comentarios",
};

@Injectable({
  providedIn: "root",
})
export class ComentariosService {
  constructor(
    private apiService: ApiService,
    private encryptService: EncryptService
  ) {}

  FiltrarComentarios(IdTablaRelacion: number, IdRelacion: number, pagina: number, tipo: number = 0): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.apiService.get(`${routes.comentarios}/FiltrarComentarios?IdTablaRelacion=${IdTablaRelacion}&IdRelacion=${IdRelacion}&pagina=${pagina}&tipo=${tipo}`);
  }

  CargarComentariosxIds(IdTablaRelacion: number, IdRelacion: number, pagina: number): Observable<any>  {
    // tslint:disable-next-line: max-line-length
    return this.apiService.get(`${routes.comentarios}/CargarComentarios?IdTablaRelacion=${IdTablaRelacion}&IdRelacion=${IdRelacion}&pagina=${pagina}`);
  }
  EliminarComentario(idComentario: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.apiService.postApi(`${routes.comentarios}/EliminarComentarios?idComentario=${idComentario}`);
  }
}
