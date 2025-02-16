import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { BusquedaGastoRequest } from '../models/requests/gastos/BusquedaGastoRequest';
import { NuevoGastoRequest } from '../models/requests/gastos/NuevoGastoRequest';
import { ActualizarGastoRequest } from '../models/requests/gastos/ActualizarGastoRequest';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  Busqueda(request: BusquedaGastoRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Gastos/Busqueda`, request);
  }

  GastoPorId(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Gastos/PorId/${id}`);
  }

  EliminarGasto(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Gastos/Eliminar/${id}`);
  }

  NuevoGasto(request: NuevoGastoRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Gastos/Nuevo`, request);
  }

  ActualizarGasto(request: ActualizarGastoRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Gastos/Actualizar`, request);
  }
}
