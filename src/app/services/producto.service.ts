import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { ProductoResponse } from '../models/responses/ProductoResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  Lista(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(`${this.baseUrl}Productos/Lista`);
  }
}
