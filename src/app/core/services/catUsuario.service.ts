import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment as env } from '@env/environment';
import { CatUsuarioModel } from '../models/CatUsuario.Model';

const { apiUrlCore } = env;

const routes = {
  catalogo: '/CatUsuario',
}

@Injectable({
  providedIn: 'root'
})
export class CatUsuarioService {

  @Output() disparadorCarga: EventEmitter<any> = new EventEmitter();
  constructor(private apiService: ApiService,
    private httpClient: HttpClient) { }

  CatUsuariosGetAll(objSearch: any): Observable<any> {
    return this.apiService.postCore(`${routes.catalogo}/CatUsuariosGetAll`, objSearch);
  }

  RolGet(): Observable<any> {
    return this.apiService.getCore(`${routes.catalogo}/RolGet`);
  }


  GetUsuario(): Observable<any> {
    return this.apiService.getCore(`${routes.catalogo}/GetUsuario`);
  }

  CatUsuarioInsert(info: CatUsuarioModel): Observable<any> {
    console.log('info usuario', info);
    
    return this.apiService.postCore(`${routes.catalogo}/CatUsuarioInsert`, info);
  }

  CatUsuariosUpdate(info: CatUsuarioModel): Observable<any> {
    return this.apiService.postCore(`${routes.catalogo}/CatUsuariosUpdate`, info);
    
  }

  CatUsuarioActiveInnactive(IdsCatUsuarios: number[]): Observable<any> {
    return this.apiService.postCore(`${routes.catalogo}/CatUsuarioActiveInnactive`, IdsCatUsuarios);
  }

  CatUsuarioDelete(IdsCatUsuarios: number){
    return this.apiService.postCore(`${routes.catalogo}/EliminarUsuario?IdCatUsuario=${IdsCatUsuarios}`);
  }
}