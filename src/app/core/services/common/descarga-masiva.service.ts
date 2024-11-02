import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// services
import { ApiService } from '../api.service';

// models

const routes = {
  descarga: '/DownloadDocuments'
};


@Injectable({
  providedIn: 'root'
})
export class DescargaMasivaService {

  constructor(private apiService: ApiService) { }

  downloadDocuments(folder: string, seleccion: string[] = []) {
    let objeto = {
      carpeta: folder,
      seleccion: seleccion
    };

    return this.apiService.getDownloadDoc(
      `${routes.descarga}/DescargaMasiva?carpeta=${folder}`, objeto);
  }

  getListProyectoDocumento(idTablaRelacion: number, pagina: number, values: any): Observable<any> {
    let objeto = {
      pagina,
      idTablaRelacion,
      proyectos: values
    }

    return this.apiService.postApi(`${routes.descarga}/GetProyectDocumentList`, objeto);
  }

  getListExpedienteDocumento(idProyecto: number, pagina: number, values: any): Observable<any> {
    let objeto = {
      idProyecto,
      pagina,
      idTablaRelacion: 2,
      expediente: values
    }

    return this.apiService.postApi(`${routes.descarga}/GetExpedienteDocumentList`, objeto);
  }

  downloadDocumentById(idDocument: number): Observable<any> {
    return this.apiService.getDocument(`${routes.descarga}/downloadDocumentById?idDocumento=${idDocument}`);
  }

  getPropiedadesDocumento(idTablaRelacion: number, idRelacion: number, idTipoDocumento?: number): Observable<any> {
    return this.apiService.get(`${routes.descarga}/GetDocumentProperties?idTablaRelacion=${idTablaRelacion}&idRelacion=${idRelacion}&idTipoDocumento=${idTipoDocumento}`);
  }
  PrepararDocumentosExpedientes(IdEncProyecto: any, IdEncExpediente: string, Tipo: number, soloContratos: boolean): Observable<any> {
    return this.apiService.getDocument(`${routes.descarga}/PrepararDocumentosExpedientes?IdEncProyecto=${IdEncProyecto}&Expediente=${IdEncExpediente}&Tipo=${Tipo}&soloContratos=${soloContratos}`);
  }
}
