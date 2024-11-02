import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// services
import { ApiService } from './api.service';
import { EncryptService } from './common/encrypt.service';

// models
import { ActividadHistorialResponse } from '@models/responses/actividadHistorial.response';
import { ActividadHistorialFiltros } from '@models/actividadesHistorial.model';


const routes = {
  proyectos: '/HistorialActividades'
};

@Injectable({
  providedIn: 'root'
})
export class ActividadesHistorialService {

  constructor(private apiService: ApiService, private encrypt: EncryptService) { }

  getActividadesList(idProyecto: number, pagina: number): Observable<ActividadHistorialResponse> {
    return this.apiService.get(`${routes.proyectos}/HistorialActividadList?idProyecto=${idProyecto}&pagina=${pagina}`);
  }

  getActividadesListFiltros(idProyecto: number, pagina: number, filtros: ActividadHistorialFiltros): Observable<ActividadHistorialResponse> {
    const filtrosData = {
      idProyecto,
      pagina,
      filtros
    };
    return this.apiService.postApi(`${routes.proyectos}/HistorialActividadList`, filtrosData);
  }

  getActividades(pagina: number, usuario: string, idActividad: number, fechaCreacionInicio: string, fechaCreacionHasta: string, IdRelacion: number, IdPantalla: number): Observable<any> {
    const IdRelEncrypt = this.encrypt.encryptId(IdRelacion);
    const IdRelacionEncrypt = decodeURIComponent(decodeURIComponent(IdRelEncrypt));
    return this.apiService.postApi(`${routes.proyectos}/HistorialActividadList?pagina=${pagina}&usuario=${usuario}&IdActividad=${idActividad}&fechaCreacionInicio=${fechaCreacionInicio}&fechaCreacionHasta=${fechaCreacionHasta}&IdRelacion=${IdRelacionEncrypt}&IdPantalla=${IdPantalla}`);
  }
}
