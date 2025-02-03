import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { NuevoClienteRequest } from '../models/requests/clientes/NuevoClienteRequest';
import { BusquedaClienteRequest } from '../models/requests/clientes/BusquedaClienteRequest';
import { ActualizarClienteRequest } from '../models/requests/clientes/ActualizarClienteRequest';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  Busqueda(request: BusquedaClienteRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Clientes/Busqueda`, request);
  }

  ListaCatalogoClientes(): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Clientes/ListaCatalogoClientes`);
  }

  NuevoCliente(request: NuevoClienteRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Clientes/Nuevo`, request);
  }

  ClientePorId(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Clientes/PorId/${id}`);
  }

  EliminarCliente(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Clientes/Eliminar/${id}`);
  }

  ActualizarCliente(request: ActualizarClienteRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Clientes/Actualizar`, request);
  }
}
