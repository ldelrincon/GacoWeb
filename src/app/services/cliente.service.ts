import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { NuevoClienteRequest } from '../models/requests/clientes/NuevoClienteRequest';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  ListaCatalogoClientes(): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Clientes/ListaCatalogoClientes`);
  }

  NuevoCliente(request: NuevoClienteRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Clientes/Nuevo`, request);
  }
}
