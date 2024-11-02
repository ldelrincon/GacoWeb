import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';
import { environment as env } from '@env/environment';

const { apiUrlCore } = env;

const routes = {
  solicitud: '/Solicitudes',
  detalleSolicitud: '/DetalleSolicitud',  
  catGeograficos: '/CatalogosGeograficos'
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private apiService: ApiService,
    private httpClient: HttpClient) { }

  

}
