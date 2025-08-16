import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusquedaUsuarioRequest } from '../models/requests/usuario/BusquedaUsuarioRequest';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { UsuarioRequest } from '../models/requests/UsuarioRequest';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  Busqueda(request: BusquedaUsuarioRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Usuarios/Busqueda`, request);
  }

  NuevoUsuario(request: UsuarioRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Usuarios/Nuevo`, request);
  }

  UsuarioPorId(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Usuarios/PorId/${id}`);
  }

  EliminarUsuario(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Usuarios/Eliminar/${id}`);
  }

   ActivarUsuario(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Usuarios/Activar/${id}`);
  }

  UsuariosPorTipo(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Usuarios/PorIdTipo/${id}`);
  }
}
