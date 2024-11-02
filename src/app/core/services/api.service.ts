import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as env } from '@env/environment';
import CryptoJS from 'crypto-js';
import { AuthenticationService } from './seguridad/authentication.service';

const serverUrl  = env.apiUrlCore;
const serverUrlDocs = env.serverUrlDocs;
const serverUrlLP  = env.serverUrlLP;
const serverUrlCatalogoGeograficos = env.apiUrlCatalogoGeograficos;
const keyEncriptada  = env.keyEncriptacion;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  NombreToken: any;
  constructor(private httpClient: HttpClient, private aut: AuthenticationService) {
   this.NombreToken =  this.aut.getPort();
  }

  public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    let options = { headers: hdr };
    return this.httpClient.get(serverUrlDocs + path, options)
      .pipe(catchError(this.formatErrors));
  }
  public getCore(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    let options = { headers: hdr };
    return this.httpClient.get(serverUrl + path, options)
      .pipe(catchError(this.formatErrors));
  }

  public getCatGeograficos(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    let options = { headers: hdr };
    return this.httpClient.get(serverUrlCatalogoGeograficos + path, options)
      .pipe(catchError(this.formatErrors));
  }

  public getWithoutToken(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json',
    };
    let options = { headers: hdr };
    return this.httpClient.get(serverUrlDocs + path, options).pipe(catchError(this.formatErrors));
  }

  public getDocument(path: string): Observable<any> {
    const httpOptions = {
      'responseType': 'arraybuffer' as 'json',
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    return this.httpClient.get<any>(serverUrlDocs + path, httpOptions);
  }

  public getDownloadDoc(path: string, body: object = {}): Observable<any> {
    const httpOptions = {
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`),
      'responseType': 'arraybuffer' as 'json',
    };
    return this.httpClient.post<any>(serverUrlDocs + path, body, httpOptions);
  }

  public getDownloadDocx(path: string): Observable<any> {
    const httpOptions = {
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`),
      'responseType': 'arraybuffer' as 'json',
    };
    return this.httpClient.post<any>(serverUrlDocs + path, httpOptions);
  }

  public put(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .put(serverUrlDocs + path, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  public postApi(path: string, body: object = {}): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    let options = { headers: hdr };
    return this.httpClient.post(serverUrlDocs + path, body, options).pipe(catchError(this.formatErrors));
  }
  public postApiSolicitus(path: string, body: object = {}): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    let options = { headers: hdr };
    return this.httpClient.post(serverUrl + path, body, options).pipe(catchError(this.formatErrors));
  }
  public postApiCatGeograficos(path: string, body: object = {}): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    let options = { headers: hdr };
    return this.httpClient.post(serverUrlCatalogoGeograficos + path, body, options).pipe(catchError(this.formatErrors));
  }

  public getFIleLP(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    let options = {
      headers: hdr,
      responseType: 'blob' as 'json',
      reportProgress: true
    };
    return this.httpClient.get(serverUrlLP + path, options).pipe(catchError(this.formatErrors));
  }

  public getFIleExcel(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    let hdr = {
      'Content-Type': 'application/vnd.ms-excel',
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    let options = {
      headers: hdr,
      responseType: 'blob' as 'json',
      reportProgress: true
    };
    return this.httpClient.get(serverUrlDocs + path, options).pipe(catchError(this.formatErrors));
  }

  public postFileLP(path: string, body: object = {}): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    let options = {
      headers: hdr,
      responseType: 'blob' as 'json',
      reportProgress: true
    };
    return this.httpClient.post(serverUrlLP + path, body, options);
  }

  public postFiles(path: string, body: object = {}, config: object = {}): Observable<any> {
    let hdr = {
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    config['headers'] = hdr;
    return this.httpClient.post(serverUrlDocs + path, body, config).pipe(catchError(this.formatErrors));
  }

  public verificaPerfilLogin(strToken, id, path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${strToken}`
      })
    };

    return this.httpClient
      .get<any>(`${serverUrlDocs+path}IdUsuario=${id}`,httpOptions);
  }


  public post(path: string, body: object = {}): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    let options = { headers: hdr };
    return this.httpClient
      .post(serverUrlDocs + path, JSON.stringify(body), options)
      .pipe(catchError(this.formatErrors));
  }

  public postCore(path: string, body: object = {}): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    let options = { headers: hdr };
    console.log('options', options);

    return this.httpClient
      .post(serverUrl + path, JSON.stringify(body), options)
      .pipe(catchError(this.formatErrors));
  }
  public postCatGeograficos(path: string, body: object = {}): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(`jwtToken${this.NombreToken}`)
    };
    let options = { headers: hdr };
    return this.httpClient
      .post(serverUrlCatalogoGeograficos + path, JSON.stringify(body), options)
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    return this.httpClient.delete(serverUrlDocs + path).pipe(catchError(this.formatErrors));
  }


  public formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }

  public GetValidarToken(token: string, path: string): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    let options = { headers: hdr };
    return this.httpClient.get(serverUrlDocs + path, options)
      .pipe(catchError(this.formatErrors));
  }

  public getCntaInvitado(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    let hdr = {
      'Content-Type': 'application/json'
    };
    let options = { headers: hdr };
    return this.httpClient.get(serverUrlDocs + path, options)
      .pipe(catchError(this.formatErrors));
  }

  encryptId(id: number): string {
    const key = CryptoJS.enc.Utf8.parse(keyEncriptada); // Clave de 16 caracteres (64 bits)
     const encrypted = CryptoJS.AES.encrypt(id.toString(), key, { mode: CryptoJS.mode.ECB }).toString();
     const encodedParam = encodeURIComponent(encrypted);
    return encodedParam;
  }

}
