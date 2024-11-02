import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// services
import { ApiService } from './api.service';

//models
import { TipoDocumento } from '../models/tipoDocumentos.model';

const routes = {
    tipoDocumento: '/TipoDocumento'
  };

  @Injectable({
    providedIn: 'root'
  })

export class TipoDocumentoService {

  constructor(private apiService: ApiService) { }

  CargarListTipoDocumentos(nombreDocumento: string, codigo: string, pagina: number): Observable<any> {
    return this.apiService.get(`${routes.tipoDocumento}/GetListDocumentos?nombreDocumento=${nombreDocumento}&codigo=${codigo}&Pagina=${pagina}`);
  }

  AddEditCatTipoDocumento(tipoDocumento: TipoDocumento): Observable<any> {
    return this.apiService.postApi(`${routes.tipoDocumento}/AddEditCatTipoDocumento`, tipoDocumento);
  }
  
  DeleteCatTipoDocumento(idTipoDocumento: number): Observable<any> {
    return this.apiService.get(`${routes.tipoDocumento}/DeleteCatTipoDocumento?IdTipoDocumento=${idTipoDocumento}`);
  }

}