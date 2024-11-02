// import { Injectable } from '@angular/core';
// import { HubConnection } from '@aspnet/signalr';
// import { environment as env } from '@env/environment';
// import { ApiService } from './api.service';
// import { Observable } from 'rxjs';
// import { NotificacionesResponse } from '../models/responses/notificaciones.response';
// import { Notificaciones } from '../models/encNotificaciones.model'
// import { EncryptService } from './common/encrypt.service';
// const { HubMessage } = env;
// const routes = {
//   notificacion: '/Notificacion'
// };
// @Injectable({
//   providedIn: 'root'
// })
// export class NotificacionesService {

//   _hubConnection: HubConnection;

//   constructor(private apiService: ApiService, private encrypt: EncryptService) { 
//   }

//   GetNotificaciones(pagina: number, registrosPorPagina: number, usuarioNotificacion: number, mostrarTodos?: boolean): Observable<NotificacionesResponse> {
//     const usuarioEncrypt = this.encrypt.encryptId(usuarioNotificacion);
//     if(mostrarTodos != undefined){
//     return this.apiService.get(`${routes.notificacion}/ObtenerNotificaciones?mostrarTodosCheck=${mostrarTodos}&pagina=${pagina}&registrosPorPagina=${registrosPorPagina}&usuarioNotificacion=${usuarioEncrypt}`);
//     }
//     else{
//     return this.apiService.get(`${routes.notificacion}/ObtenerNotificaciones?pagina=${pagina}&registrosPorPagina=${registrosPorPagina}&usuarioNotificacion=${usuarioEncrypt}`);
//     }
//   }

//   GetInferiores(): Observable<NotificacionesResponse> {
//     return this.apiService.get(`${routes.notificacion}/ObtenerInferiores`);
//   }

//   MarcarEnviado(id:number): Observable<any> {
//     return this.apiService.postApi(`${routes.notificacion}/MarcarEnviado?Id=${id}`);
//   }

//   ModificarCheckVisto(all: boolean, idRelNotificacionUsuario: number){
//     return this.apiService.get(`${routes.notificacion}/ModificarCheckVisto?all=${all}&idRelNotificacionUsuario=${idRelNotificacionUsuario}`);
//   }

//   CargarTpoNotificaciones(pagina: number, registrosPorPagina: number, TxtFiltro: string, tipo: number, IdCatNotificaciones: string, IdUsuarios: string, IdPerfiles: string): Observable<NotificacionesResponse> {
//     return this.apiService.get(`${routes.notificacion}/CargarTpoNotificaciones?pagina=${pagina}&registrosPorPagina=${registrosPorPagina}&TxtFiltro=${TxtFiltro}&tipo=${tipo}&IdCatNotificaciones=${IdCatNotificaciones}&IdUsuarios=${IdUsuarios}&IdPerfiles=${IdPerfiles}`);
//   }
//   IsAdministradorGerencia(): Observable<boolean> {
//     return this.apiService.get(`${routes.notificacion}/IsAdministradorGerencia`);
//   }
//   AsignarNotificaciones(objModNotificacion: Notificaciones): Observable<any>{
//     return this.apiService.postApi(`${routes.notificacion}/AsignarNotificaciones`, objModNotificacion);
//   }
//   EliminarRelNotificaciones(idCatTipoNotificacion: number): Observable<any> {
//     return this.apiService.get(`${routes.notificacion}/EliminarRelNotificacionUsuarioPerfil?IdCatTipoNotificacion=${idCatTipoNotificacion}`);
//   }

//   NotificacionDocumentosAutorizados(IdEncProyecto: number, IdEncExpediente: number, 
//                                     IdRelacion: number, IdTipoNotificacion: number): Observable<any> {
//     return this.apiService.postApi(`${routes.notificacion}/NotificacionDocumentosAutorizados?IdEncProyecto=${IdEncProyecto}&IdEncExpediente=${IdEncExpediente}&IdRelacion=${IdRelacion}&IdTipoNotificacion=${IdTipoNotificacion}`);
//   }
//   ActivarDeactivarEnvioCorreoNotificaciones(IdReloNotificacion: number, isEnviado: boolean): Observable<any>{
    
//     return this.apiService.postApi(`${routes.notificacion}/ActivarDeactivarEnvioCorreoNotificaciones?IdReloNotificacion=${IdReloNotificacion}&isEnviado=${isEnviado}`);
//   }
//   GetNotificacionesVista(pagina: number, registrosPorPagina: number, usuarioNotificacion: number, mostrarTodos?: boolean): Observable<NotificacionesResponse> {    
//     const usuarioEncrypt = this.encrypt.encryptId(usuarioNotificacion);
//     return this.apiService.get(`${routes.notificacion}/ObtenerNotificacionesVista?mostrarTodosCheck=${mostrarTodos}&pagina=${pagina}&registrosPorPagina=${registrosPorPagina}&usuarioNotificacion=${usuarioEncrypt}`);    
//   }

//   MarcarNotificacionesVistas(IdRelNotificacionUsuario:number): Observable<any> { 
//     return this.apiService.postApi(`${routes.notificacion}/MarcarNotificacionesVistas?IdRelNotificacionUsuario=${IdRelNotificacionUsuario}`);
//   }

  
// }
