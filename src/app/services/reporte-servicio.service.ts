import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { NuevoReporteServicioRequest } from '../models/requests/reporte-solicitud/NuevoReporteSolicitudRequest';
import { ActualizarReporteServicioRequest } from '../models/requests/reporte-solicitud/ActualizarReporteSolicitudRequest';
import { BusquedaReporteServicioRequest } from '../models/requests/reporte-solicitud/BusquedaReporteServicioRequest';
import { BusquedaGenericoRequest } from '../models/requests/BusquedaGenericoRequest';
import { CambiarEstatusEnSeguimentoRequest } from '../models/requests/reporte-solicitud/CambiarEstatusEnSeguimentoRequest';
import { BusquedaReporteFiltrosServicioRequest } from '../models/requests/reporte-solicitud/BusquedaReporteFiltrosServicioRequest';

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

  BusquedaFiltros(request: BusquedaReporteFiltrosServicioRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}ReporteServicios/BusquedaFiltros`, request);
  }

  ReporteServicioPorId(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}ReporteServicios/PorId/${id}`);
  }

  ReporteServicioSeguimentoPorId(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}ReporteServicios/SeguimentoPorId/${id}`);
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

  BusquedaSeguimentoActivo(request: BusquedaGenericoRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}ReporteServicios/BusquedaSeguimentoActivo`, request);
  }

  BusquedaSeguimentoActivoFiltros(request: BusquedaReporteFiltrosServicioRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}ReporteServicios/BusquedaSeguimentoActivoFiltros`, request);
  }

  CambiarEstatusEnSeguimento(request: CambiarEstatusEnSeguimentoRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}ReporteServicios/CambiarEstatusEnSeguimento`, request);
  }
}
