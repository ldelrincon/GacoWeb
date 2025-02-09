import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvidenciaService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  EvidenciaPorId(id: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Evidencias/PorId/${id}`);
  }
}
