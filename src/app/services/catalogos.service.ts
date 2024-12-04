import { inject, Injectable } from '@angular/core';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  ListaCatTipoUsuarios(): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Catalogos/ListaCatTipoUsuarios`);
  }

  ListaCatRegimenFiscales(): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Catalogos/ListaCatRegimenFiscales`);
  }

  ListaCatTipoSolicitudes(): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Catalogos/ListaCatTipoSolicitudes`);
  }

  ListaCatEstados(): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Catalogos/ListaCatEntidadesFederativas`);
  }

  ListaCatMunicipio(efeKey: string): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Catalogos/ListaCatMunicipioPorEfeKey/${efeKey}`);
  }

  ListaCatGrupoProductos(): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Catalogos/ListaCatGrupoProductos`);
  }
}
