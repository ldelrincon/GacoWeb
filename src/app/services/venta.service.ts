import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { BusquedaReporteFiltrosServicioRequest } from '../models/requests/reporte-solicitud/BusquedaReporteFiltrosServicioRequest';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  BusquedaFiltrosVenta(request: BusquedaReporteFiltrosServicioRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}VentasApi/BusquedaFiltros`, request);
  }

  NuevoRegistro(request: any): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}VentasApi/NuevoRegistro`, request);
  }
}
