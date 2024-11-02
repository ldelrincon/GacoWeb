import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/seguridad/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private objLogin = { dataPass: '',  dataCuenta: ''};
  jwtHelper: any;
  port: string;
  constructor(private router: Router,private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const url = this.getPort();
      const userLocal = window.localStorage[`userSession${url}`];

      if (userLocal) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(userLocal));
      } else {
        this.userSubject = new BehaviorSubject<User>(null);
      }

      this.user = this.userSubject.asObservable();
    } else {
      this.userSubject = new BehaviorSubject<User>(null);
      this.user = this.userSubject.asObservable();
    }
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public get isLogin(): boolean {
    return this.userSubject.value != null ? true : false;
  }

  async login(correo: string, password: string, CodigoOtp: string,  tipo: number) {
    let response = await firstValueFrom(this.http.post<any>(`${environment.apiUrlCore}/auth/login`, {correo, password, CodigoOtp, tipo}));
    let user: User = response.object;
    this.saveSession(user);
  }


  async loginA(correo: string, password: string) {
    return await firstValueFrom(this.http.post<any>(`${environment.apiUrlCore}/auth/loginA`, {correo, password}));
  }

  async logout() {
   // await firstValueFrom(this.http.get(`${environment.apiUrlCore}/auth/logout`));
    this.$logout();
  }

  async $logout() {
    this.clearSession();
    this.router.navigate(['/login']);
  }


  async logout2() {
    await firstValueFrom(this.http.get(`${environment.apiUrlCore}/auth`));
    this.$logout2();
  }
  async $logout2() {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  async singUp(correo: string, password: string){
    return await firstValueFrom(this.http.post<any>(`${environment.apiUrlCore}/auth/singup`, {correo, password }));
  }

  async forgotPassword(correo :string, tipo = 4){
    return await firstValueFrom(this.http.post<any>(`${environment.apiUrlCore}/auth/forgotPassword`, { correo, tipo }));
  }

  async approveChangePassword(uuid :string){
    return await firstValueFrom(this.http.get(`${environment.apiUrlCore}/auth/approveChangePassword/${uuid}`));
  }

  async changePassword(uuid :string, password:string){
    return await firstValueFrom(this.http.post(`${environment.apiUrlCore}/auth/ChangePassword/${uuid}`, { password }));
  }

  getPort(): string {
    if (typeof window !== 'undefined') {
      let url = window.location.href;
      let hostname = new URL(url).hostname;
      let dev: string;

      if (hostname === 'localhost') {
        dev = 'localhost';
      } else {
        dev = hostname.split('.')[0];
      }
      return dev;
    } else {
      // Manejar el caso cuando 'window' no está disponible (ej. SSR)
      return 'localhost';  // Devuelve un valor predeterminado o un valor vacío
    }
  }

  saveToken(token: string) {
    const url = this.getPort();
    window.localStorage[`jwtToken${url}`] = token;
  }

  saveSession(user: User){
    const url = this.getPort();
    localStorage[`userSession${url}`] = JSON.stringify(user);
    this.userSubject.next(user);
  }

  public retrieveSession(){
    const url = this.getPort();
    let userSession = localStorage.getItem(`userSession${url}`);
    let savedSession: User = JSON.parse(userSession);
    if(savedSession){
      this.userSubject.next(savedSession);
    }else{
      this.userSubject.next(null);
    }
  }

  clearSession(){
    const url = this.getPort();
    sessionStorage.removeItem(`userSession${url}`)    //.clear();
    localStorage.removeItem(`userSession${url}`)     //.clear();
    sessionStorage.removeItem(`jwtToken${url}`)    //.clear();
    localStorage.removeItem(`jwtToken${url}`)     //.clear();
    localStorage.removeItem(`codIdioma`)    //.clear();

    this.userSubject.next(null);
  }

  async getFirstLogin(correo: string) {
    return await firstValueFrom(this.http.get<any>(`${environment.apiUrlCore}/auth/getFirstLogin/${correo}`));
  }

  createUserCoBorrower(correo: string, username: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrlCore}/auth/CreateUserCoBorrower`, {correo, username});
  }

  ModificarTiempoSerradoSesion(lst: any[]){
    return this.http.post<any>(`${environment.apiUrlCore}/auth/ModificarTiempoSerradoSesion`, lst);
  }

  async ConfirmarLogeoUsuarioIduOtp(correo:string, password:string, CodigoOtp: string){
    let response = await firstValueFrom(this.http.post<any>(`${environment.apiUrlCore}/auth/ConfirmarLogeoUsuarioIduOtp`,{correo, password, CodigoOtp }));
    let user: User = response.object;
    this.saveToken(user.jwtToken);
    this.saveSession(user);
    return response;
  }

  setObjLogin(cuenta,pass){
    this.objLogin.dataCuenta = cuenta;
    this.objLogin.dataPass = pass;
  }

  getObjLogin(){
    return this.objLogin;
  }

  public get isCodigo(): boolean {
    return JSON.parse(localStorage.getItem('isCodigo'));
  }

  obtenerMensajeDocumetosRequeridosWelcome(){
    return this.http.get<any>(`${environment.apiUrlCore}/auth/obtenerMensajeDocumetosRequeridosWelcome`);

  }
}
