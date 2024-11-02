import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// models
import { UsuarioPermiso } from '@models/common/permisos.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private currentPermisosSubject = new BehaviorSubject<UsuarioPermiso[]>(null);
  public currentPermisos = this.currentPermisosSubject.asObservable();


  constructor() { }

  changeDataPermisos(data: UsuarioPermiso[]) {
    this.currentPermisosSubject.next(data);
  }
  
}
