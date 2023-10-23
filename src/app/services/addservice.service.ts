import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface serv{
  service_code:string;
  service_type:string;
  stock_type:string;
  sac_code:string;
  item_description:string;
}


@Injectable({
  providedIn: 'root'
})
export class AddserviceService {

  constructor(private httpclient:HttpClient) { }
  createService(service:serv,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addservice,service,{headers:{'key':key,'user':user}})
  }
}
