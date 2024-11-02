import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { ConfigDirectivasModel } from '../../models/seguridad/ConfigDirectivas.model';
import { environment } from 'src/environments/environment';

const routes = {
  Directivas: '/ConfigDirectivas',
}

@Injectable({
  providedIn: 'root'
})
export class ConfigDirectivasService {
  constructor(private apiService: ApiService, private httpClient: HttpClient,
    private http: HttpClient,) { }
    
  SaveConfigDirectivas(objConfigDirectivas: ConfigDirectivasModel): Observable<any> {
    return this.apiService.postCore(`${routes.Directivas}/SaveConfigDirectivas`, objConfigDirectivas);
  }
  UpdateConfigDirectivas(objConfigDirectivas: ConfigDirectivasModel): Observable<any> {

    return this.apiService.postCore(`${routes.Directivas}/UpdateConfigDirectivas`, objConfigDirectivas);
  }
  GetConfigDirectivas(): Observable<any> {
    return this.apiService.getCore(`${routes.Directivas}/GetConfigDirectivas`);
  }

  CargarComplejidadCo(correoComple: string): Observable<any> {
    return this.apiService.getCore(`${routes.Directivas}/CargarComplejidadCo?correoComple=${correoComple}`);

  }

}
