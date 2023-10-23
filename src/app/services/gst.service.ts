import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export interface gststore{
  service_name:string;
  gst_code:number;
  invoice_date:string;
  invoice_number:number;
  customer_code:number;
  phone_number:number;
  whatshapp_number:number;
  email:string;
  name:string;
  selectedCountry:string;
  selectedState:string;
  selectedDistrict:string;
  pin_code:number;
  address:string;
 
}


@Injectable({
  providedIn: 'root'
})
export class GstService {

  constructor(private httpclient:HttpClient) { }
  createGst(gst:gststore,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addgst,gst,{headers:{'key':key,'user':user}})
  }
}
