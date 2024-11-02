import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env/environment';

const { serverUrl } = env;


@Injectable({
  providedIn: 'root'
})
export class UploadfilesService {

  constructor(private httpClient: HttpClient) { }


  getPDF() {
    const url = `${serverUrl}/Visualizador/GetPdf`;
    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
    };

    return this.httpClient.get<any>(url, httpOptions);
  }

  getIMAGE() {
    const url = `${serverUrl}/Visualizador/GetImagen`;
    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
    };

    return this.httpClient.get<any>(url, httpOptions);
  }

}
