import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment as env } from '@env/environment';
import { CatEmpresasModel, ModProyectos, ModulosEmp } from '../models/catEmpresas.model';

const { apiUrlCore } = env;

const routes = {
  catalogo: '/CatEmpresas',
}

@Injectable({
  providedIn: 'root'
})
export class CatEmpresasService {
    @Output() disparadorCarga: EventEmitter<any> = new EventEmitter();
    @Output() disparadorCargaModelo: EventEmitter<any> = new EventEmitter();
    @Output() disparadorCargaPantallas: EventEmitter<any> = new EventEmitter();


    constructor(private apiService: ApiService,
        private httpClient: HttpClient) { }

        AgregarCatEmpresa(info: CatEmpresasModel): Observable<any> {
        return this.apiService.postCore(`${routes.catalogo}/AgregarCatEmpresa`, info);
      }
    
      ModificarCatEmpresa(info: CatEmpresasModel): Observable<any> {
        return this.apiService.postCore(`${routes.catalogo}/ModificarCatEmpresa`, info);
        
      }

      CargarCatEmpresas(objSearch: any): Observable<any> {
        return this.apiService.postCore(`${routes.catalogo}/CargarCatEmpresas`, objSearch);
      }

      CargarCatModulos(objSearch: any): Observable<any> { 
        return this.apiService.postCore(`${routes.catalogo}/CargarCatModulos`, objSearch);
      }

      // SECCION DE PROYECTOAS

      CargarCombEmpresas(): Observable<any> {
        return this.apiService.getCore(`${routes.catalogo}/CargarCombEmpresas`);
      }

      AgregarCatModulosEmp(info: ModulosEmp): Observable<any> {  
        return this.apiService.postCore(`${routes.catalogo}/AgregarCatModulosEmp`, info);
      }
    
      ModificarCatModuloEmp(info: ModulosEmp): Observable<any> {
        return this.apiService.postCore(`${routes.catalogo}/ModificarCatModulosEmp`, info);
      }

      CargarCatModulosEm(objSearch: any): Observable<any> {
        return this.apiService.postCore(`${routes.catalogo}/CargarCatModulosEm`, objSearch);
      }


       // SECCION DE MODULOS

       CargarCatPantallas(objSearch: any): Observable<any> {
        return this.apiService.postCore(`${routes.catalogo}/CargarCatPantallas`, objSearch);
      }

      //cargar combo de proyecto

      CargarCombProyectos(): Observable<any> {
        return this.apiService.getCore(`${routes.catalogo}/CargarCombProyectos`);
      }

      CargarCombPantallaPrincipal(isCatalogo: boolean, IdModulo: number): Observable<any> {
        return this.apiService.getCore(`${routes.catalogo}/CargarCombPantallaPrincipal?isCatalogo=${isCatalogo}&IdModulo=${IdModulo}`);
      }

      
      AgregarCatPantalla(info: ModProyectos): Observable<any> {  
        return this.apiService.postCore(`${routes.catalogo}/AgregarCatPantalla`, info);
      }

      ModificarCatPantalla(info: ModProyectos): Observable<any> {
        return this.apiService.postCore(`${routes.catalogo}/ModificarCatPantalla`, info);
      }



}