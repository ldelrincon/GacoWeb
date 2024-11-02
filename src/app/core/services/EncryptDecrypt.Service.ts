import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EncryptDecryptService {
    private key = CryptoJS.enc.Base64.parse(environment.keyEncriptacion);
    private iv = CryptoJS.enc.Base64.parse(environment.EncryptIV);
   
    constructor() {}
    // Methods for the encrypt and decrypt Using AES
    // encryptUsingAES256(text): any {
    //     const txtJson = JSON.stringify(text)
    //     let encrypted = CryptoJS.AES.encrypt(txtJson, this.key, {
    //         iv: this.iv,
    //         mode: CryptoJS.mode.CBC,
    //         padding: CryptoJS.pad.Pkcs7
    //     }).toString();
    //     return encrypted;
    // }

    encryptUsingAES256(text): any {
        var txtJson;
       
        if (typeof text === 'object' && !Array.isArray(text)) {
         
          txtJson = text;
          text = JSON.stringify(text)
        }
       
        let encrypted = CryptoJS.AES.encrypt(text, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
       
       
        return encrypted;
    }

    decryptUsingAES256(decString) {
        let decrypted = CryptoJS.AES.decrypt(decString, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        const decryptedObject = JSON.parse(decryptedText);
        return decryptedObject;
    }

    decryptMsg(decString) {
        let decrypted = CryptoJS.AES.decrypt(decString, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        return decryptedText;
    }

    
}