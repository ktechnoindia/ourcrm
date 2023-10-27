import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  private secretKey: string = 'R;@N#V4cp3B5sZ]m'; // Replace with your actual secret key

  iv = CryptoJS.enc.Utf8.parse('1234567890ABCDEF'); 


  encrypt(value: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.secretKey);
    const iv = CryptoJS.enc.Utf8.parse('1234567890ABCDEF');
    const encrypted = CryptoJS.AES.encrypt(value, key, { iv: iv });
    return encrypted.toString();
  }
  

  decrypt(value: string): string {
    const bytes = CryptoJS.AES.decrypt(value, this.secretKey, { iv: this.iv });
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
