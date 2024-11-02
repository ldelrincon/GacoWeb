import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '@core/services/api.service';

const routes = {
  auth: '/auth',
  
};

@Injectable({
  providedIn: 'root'
})
//Manejador de eventos y cambios de header att:jv
export class NavbarService {

  eventTitle: Subject<any> = new Subject<any>();
  subEventTitle : Observable<any> = this.eventTitle.asObservable();

  eventNoti: Subject<any> = new Subject<any>();
  subEventNoti : Observable<any> = this.eventNoti.asObservable();

  

  constructor(private apiService: ApiService) { }

  setTitle(titleEn: string, title: string, path: string, idGuidPantalla: string){
    sessionStorage.setItem("history", path);
    sessionStorage.setItem("uuid", idGuidPantalla);
    this.eventTitle.next({
      display: title,
      displayEn: titleEn,
      path: path
    });
  }

  ChangeNotification(noti: boolean = false){
   
    this.eventNoti.next(noti);
  }
CargarTiempoSesion(): Observable<any> {
    return this.apiService.getCore(`${routes.auth}/CargarTiempoSesion`)
  }

}


