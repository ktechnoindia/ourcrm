import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export interface execut{
  role: string;
  name: string;
  manager: string;
  phone_number: number;
  email: string ;
  whatshapp_number: number;
  pan_number: number;
  commission: string;
  ledger: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddexecutiveService {

  constructor(private httpclient:HttpClient) { }
  createExecutive(executive:execut,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addexecutive,executive,{headers:{key:'key',user:'user'}})
  }
}
