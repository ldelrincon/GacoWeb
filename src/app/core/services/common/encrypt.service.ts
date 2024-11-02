import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  plainText: string = 'edgar';
  encryptText: string;
  encPassword: string = '123';
  decPassword: string = '123';

  constructor() {
    // this.convertText(); 
  }


  convertText() {
    // this.encryptData(this.plainText);
  }

  
  encryptData(data: string): string {
    let b64 = CryptoJS.AES.encrypt(data.trim(), this.encPassword.trim()).toString();
    let e64 = CryptoJS.enc.Base64.parse(b64);
    let eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
  }

  decryptData(data: string): string {
    let reb64 = CryptoJS.enc.Hex.parse(data);
    let bytes = reb64.toString(CryptoJS.enc.Base64);
    let decrypt = CryptoJS.AES.decrypt(bytes, this.decPassword.trim());
    let plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
    
  }
}
