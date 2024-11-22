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
}
