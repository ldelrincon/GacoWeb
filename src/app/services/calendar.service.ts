import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../settings/appsettings';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { NuevaTareaRequest } from '../models/requests/tareas/NuevaTareaRequest';
import { TerminarCalendarioRequest } from '../models/requests/tareas/TerminarCalendarioRequest';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  ObtenerTareas(): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Calendario/ListaPendientes`);
  }

  GuardarTarea(request: NuevaTareaRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Calendario/Nuevo`, request);
  }

  ActualizarTarea(request: NuevaTareaRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Calendario/Terminar`, request);
  }

  TerminarTarea(id: number): Observable<DefaultResponse> {
    const request: TerminarCalendarioRequest = { idCalendario: id };
    console.log('TerminarTarea Request:', request);
    return this.http.post<DefaultResponse>(`${this.baseUrl}Calendario/Terminar`, request);
  }

  EliminarTarea(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Calendario/EliminarTarea/${id}`);
  }
}
