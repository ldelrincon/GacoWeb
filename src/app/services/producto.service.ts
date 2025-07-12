import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { NuevoProductoRequest } from '../models/requests/productos/NuevoProductoRequest';
import { ActualizarProductoRequest } from '../models/requests/productos/ActualizarProductoRequest';
import { BusquedaProductoRequest } from '../models/requests/productos/BusquedaProductoRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  Busqueda(request: BusquedaProductoRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Productos/Busqueda`, request);
  }

  ProductoPorId(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Productos/PorId/${id}`);
  }

  EliminarProducto(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Productos/Eliminar/${id}`);
  }

  NuevoProducto(request: NuevoProductoRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Productos/Nuevo`, request);
  }

  ActualizarProducto(request: ActualizarProductoRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Productos/Actualizar`, request);
  }
}
