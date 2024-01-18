import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
interface quantity{
attr1:string;
attr2:string;
attr3:string;
attr4:string;
attr5:string;
attr6:string;
attr7:string;
attr8:string;
}
@Injectable({
  providedIn: 'root'
})
export class QuantitypopoverService {

  constructor(private httpclient:HttpClient) { }

  createQuantity(quant: quantity[], key: string, user: string) {
    return this.httpclient.post(environment.apiacturl + environment.addquantity, quant, { headers: { 'key': key, 'user': user } })
  }
}
