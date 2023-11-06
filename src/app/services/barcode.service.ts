import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';

export interface bar{
  barcodeaddress:string,
  sacnumber:string,
  description:string,
}

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  constructor(private http:HttpClient) { }
  createBarcode(barcode:bar,key:string,user:string){
  return this.http.post(environment.apiactionurl+environment.addbarcode,barcode,{headers:{'key':key,'user':user}})
  }
}
