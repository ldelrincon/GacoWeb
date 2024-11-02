import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
// services
import { ApiService } from './api.service';

const routes = {
  dashboard: '/Dashboard'
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public idTipoAutorizacion: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  idTipoAut = this.idTipoAutorizacion.asObservable();

  public idTipoExpediente: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  idTipoExp = this.idTipoExpediente.asObservable();

  public ventanaOrigen: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  ventana = this.ventanaOrigen.asObservable();

  public datosAutorizacion: BehaviorSubject<any> = new BehaviorSubject<any>({ idEncAutorizacion: 0, idRelAutorizacion: 0 });
  autorizacion = this.datosAutorizacion.asObservable();

  public porAutorizarEstatus: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  porAutorizar = this.porAutorizarEstatus.asObservable();

  public etapasProyecto: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  etapa = this.etapasProyecto.asObservable();

  public Paginador: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  Pag = this.Paginador.asObservable();


  constructor(private apiService: ApiService) { }

  getDashboardInfo(): Observable<any> {
    
    return this.apiService.get(`${routes.dashboard}/DashboarExpedientesInfo`);
  }

  GetDatosProyectos(Segmento: number, Tipo: number, Ubicacion: string, Etapa: number): Observable<any> {
    
    return this.apiService.get(`${routes.dashboard}/GetDatosProyectos?Segmento=${Segmento}&Tipo=${Tipo}&Ubicacion=${Ubicacion}&Etapa=${Etapa}`);
  }

  getDashboardAutorizacionInfo(): Observable<any> {
    
    return this.apiService.get(`${routes.dashboard}/DashboarAutorizacionInfo`);
  }

  getDashboardProyectos(pagina, tipoExpediente) {
    return this.apiService.get(`${routes.dashboard}/GetListaProyectos?pagina=${pagina}&idTiposExpediente=${tipoExpediente}`);
  }

  getDashboardTiposProyectos(pagina, tipoProyecto) {
    return this.apiService.get(`${routes.dashboard}/GetListaTipoProyectos?pagina=${pagina}&idTiposProyecto=${tipoProyecto}`);
  }

  ObtenerExpedientes(pagina, IdEncProyecto) {
    return this.apiService.get(`${routes.dashboard}/ObtenerExpedientes?pagina=${pagina}&IdEncProyecto=${IdEncProyecto}`);
  }


  //Redireccionamiento de datos a segun proyecto o autorizacion seleccionada
  getIdTipoAutorizacion(id: number) {
    this.idTipoAutorizacion.next(id);
  }

  getIdTipoExpediente(dato: number) {
    this.idTipoExpediente.next(dato);
  }

  getVentanaORigen(dato: number) {
    this.ventanaOrigen.next(dato);
  }

  getAutorizacionDash(dato: any) {
    this.datosAutorizacion.next(dato);
  }

  getPorAutorizar(dato: number) {
    this.porAutorizarEstatus.next(dato);
  }

  getEtapaProyecto(etapa: number) {
    this.etapasProyecto.next(etapa);
  }

  recargarAllInfo() {
    this.idTipoAutorizacion = new BehaviorSubject<number>(0);
    this.idTipoAut = this.idTipoAutorizacion.asObservable();
    this.idTipoExpediente = new BehaviorSubject<number>(0);
    this.idTipoExp = this.idTipoExpediente.asObservable();
    this.ventanaOrigen = new BehaviorSubject<number>(0);
    this.ventana = this.ventanaOrigen.asObservable();
    this.datosAutorizacion = new BehaviorSubject<any>({ idEncAutorizacion: 0, idRelAutorizacion: 0 });
    this.autorizacion = this.datosAutorizacion.asObservable();
    this.porAutorizarEstatus = new BehaviorSubject<number>(0);
    this.porAutorizar = this.porAutorizarEstatus.asObservable();
    this.etapasProyecto = new BehaviorSubject<number>(0);
    this.etapa = this.etapasProyecto.asObservable();
  }

  getDashboardProyectosxEtapas(pagina, IdSegmentoProyecto, IdEstatusProyecto) {
   
    return this.apiService.get(`${routes.dashboard}/GetListaProyectosxEtapas?pagina=${pagina}&IdSegmentoProyecto=${IdSegmentoProyecto}&IdEstatusProyecto=${IdEstatusProyecto}`);
  }
  getPaginadorExpediente(dato: number) {
    this.Paginador.next(dato);
  }
   limpiarPaginador() {
    this.Paginador = new BehaviorSubject<number>(0);
    this.Pag = this.Paginador.asObservable();
   }
}
