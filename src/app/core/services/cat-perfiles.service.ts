import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CatPerfilesModels } from "../models/CatPerfiles.model";
import { ModProyectos } from '../models/catEmpresas.model';
const routes = {
  catalogoPerfil: '/CatPerfiles'
};


@Injectable({
  providedIn: 'root'
})
export class CatPerfilesService {

  @Output() disparadorCarga: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService,
    private httpClient: HttpClient) { }

  CargarPerfiles(objSearch: any): Observable<any> {
    return this.apiService.postCore(`${routes.catalogoPerfil}/CatPerfilesCarga`, objSearch);
  }

  AgregarCatPerfil(info: CatPerfilesModels) {
    return this.apiService.postCore(`${routes.catalogoPerfil}/AgregarCatPerfil`, info);

  }

  ModificarCatPerfil(info: CatPerfilesModels) {
    return this.apiService.postCore(`${routes.catalogoPerfil}/ModificarCatPerfil`, info);

  }

  EliminarCatperfil(idPerfil: number) {
    return this.apiService.postCore(`${routes.catalogoPerfil}/EliminarCatperfil?idPerfil=${idPerfil}`);

  }

  // CARGAR SECCION DE ADMINISTRACION DE PERMISOS POR MODULO EN PERFILES
  CargarAdminPermisosModulosPerfiles(IdModulo: number, IdP: number) {
    return this.apiService.getCore(`${routes.catalogoPerfil}/CargarAdminPermisosModulosPerfiles?IdModulo=${IdModulo}&IdPerfil=${IdP}`);
  }

  AgregarPermisoPerfil(info: ModProyectos) {
    return this.apiService.postCore(`${routes.catalogoPerfil}/AgregarPermisoPerfil`, info);
  }

  AgregarPermisoUsuario(info: ModProyectos) {
    return this.apiService.postCore(`${routes.catalogoPerfil}/AgregarPermisoUsuario`, info);
  }

  CargarAdminPermisosModulosUsuario(IdModulo: number, IdU: number) {
    return this.apiService.getCore(`${routes.catalogoPerfil}/CargarAdminPermisosModulosUsuario?IdModulo=${IdModulo}&IdUsuario=${IdU}`);
  }


  
}
