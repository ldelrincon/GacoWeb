import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ScopeService {

  constructor(private http: HttpClient) { }

  async GetPantallasByRol(IdGuidRol: string) {
    return await this.http.get(`${environment.apiUrlCore}/scope/GetPantallasByRol/${IdGuidRol}`).toPromise();
  }

  getPantalla(idM: number){
    return this.http.get<any>(`${environment.apiUrlCore}/Scope/GetPantallas?idM=${idM}`);


  }

  async GetPermisosByElemento(idGuidRol: string, idGuidPantalla: string, idGuidElemento : string) {
    return await this.http.get(`${environment.apiUrlCore}/Scope/GetPermisosElemento/${idGuidRol}/${idGuidPantalla}/${idGuidElemento}`).toPromise();
  }

  async GetPermisosByPantalla(IdGuidRol: string, IdGuidPantalla: string) {
    return await this.http.get(`${environment.apiUrlCore}/Scope/GetElementosByPantalla/${IdGuidRol}/${IdGuidPantalla}`).toPromise();
  }

  async GetPantallasCatalogosByRol(IdGuidRol: string) {
    return await this.http.get(`${environment.apiUrlCore}/Scope/GetPantallasCatalogoByRol/${IdGuidRol}`).toPromise();
  }
  async GetCategoriaCatalogo() {
    return await this.http.get(`${environment.apiUrlCore}/Scope/GetCategoriaCatalogo`).toPromise();
  }
}