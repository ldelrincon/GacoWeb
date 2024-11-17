import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { UsuarioRequest } from '../models/requests/UsuarioRequest';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../models/responses/DefaultResponse';
import { LoginRequest } from '../models/requests/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  Registrarse(usuario: UsuarioRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Acceso/Registrarse`, usuario);
  }

  Login(login: LoginRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${this.baseUrl}Auth/Login`, login);
  }

  ValidarToken(token: string): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.baseUrl}Auth/ValidarToken?token=${token}`);
  }
}
