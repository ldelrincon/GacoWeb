import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { BusquedaClienteRequest } from '../models/requests/clientes/BusquedaClienteRequest';
import { NuevoProductoRequest } from '../models/requests/productos/NuevoProductoRequest';
import { ActualizarProductoRequest } from '../models/requests/productos/ActualizarProductoRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  Busqueda(request: BusquedaClienteRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Productos/Busqueda`, request);
  }

  ProductoPorId(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Productos/PorId/${id}`);
  }

  NuevoProducto(request: NuevoProductoRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Productos/Nuevo`, request);
  }

  ActualizarProducto(request: ActualizarProductoRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Productos/Actualizar`, request);
  }
}
