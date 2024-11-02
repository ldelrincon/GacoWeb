import { Injectable } from '@angular/core';
import { AuthenticationService } from './seguridad/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class JwtService {
  NombreToken: any;

  constructor(private aut: AuthenticationService) {
    this.NombreToken =  this.aut.getPort();
   }

  getToken(): String {
    return window.localStorage[`jwtToken${this.NombreToken}`];
  }

  getUserSession() {
    return window.localStorage[`userSession${this.NombreToken}`];
  }

  saveToken(token: String) {
    window.localStorage[`jwtToken${this.NombreToken}`] = token;
  }

  destroyToken() {
    window.localStorage.removeItem(`jwtToken${this.NombreToken}`);
  }
}
