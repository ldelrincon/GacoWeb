import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { SeguimientoProductoEvidenciaRequest } from '../models/requests/seguimento/SeguimientoProductoEvidenciaRequest';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  ReporteServicioSeguimentoPorId(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Seguimentos/ReporteServicioSeguimentoPorId/${id}`);
  }

  NuevoSeguimientoProductoEvidencia(request: SeguimientoProductoEvidenciaRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Seguimentos/NuevoAdjuntos`, request);
  }
}
