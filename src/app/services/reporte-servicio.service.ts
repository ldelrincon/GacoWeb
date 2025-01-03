import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { NuevoReporteServicioRequest } from '../models/requests/reporte-solicitud/NuevoReporteSolicitudRequest';
import { ActualizarReporteServicioRequest } from '../models/requests/reporte-solicitud/ActualizarReporteSolicitudRequest';
import { BusquedaReporteServicioRequest } from '../models/requests/reporte-solicitud/BusquedaReporteServicioRequest';

@Injectable({
  providedIn: 'root'
})
export class ReporteServicioService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  Busqueda(request: BusquedaReporteServicioRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}ReporteServicios/Busqueda`, request);
  }

  ReporteServicioPorId(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}ReporteServicios/PorId/${id}`);
  }

  NuevoReporteServicio(request: NuevoReporteServicioRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}ReporteServicios/Nuevo`, request);
  }

  ActualizarReporteServicio(request: ActualizarReporteServicioRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}ReporteServicios/Actualizar`, request);
  }

  // EnvioCorreo(): Observable<DefaultResponse> {
  //   return this.http.post<DefaultResponse>(`${this.baseUrl}ReporteServicios/SendEmail`,"");
  // }
  EnvioCorreo(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}ReporteServicios/SendEmail/${id}`);
  }
}
