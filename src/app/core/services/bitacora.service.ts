import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

const routes = {
  bitacora: '/bitacora',
}

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(private apiService: ApiService,
    private httpClient: HttpClient) { }

    cargarBitacora(Filtros:any): Observable<any> {
      return this.apiService.postCore(`${routes.bitacora}/GetBitacora`, Filtros);
      // Folio=${Folio}&Accion=${TipoAct}&Ejecutivo=${Ejecutivo}&startDate=${fechaInicio}&endDate=${fechaFin}&
    }
}
