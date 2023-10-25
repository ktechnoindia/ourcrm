import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


export interface amc{
 
  contactid:number;
  cName:string;
  payterms:string;
  startdate:string;
  endate:string;
  contactdur:string;  
  cover:string;
  list:string;
  contractvalue:string;
  servicelevel:string;
  listsla:string;
 
}



@Injectable({
  providedIn: 'root'
})
export class CreateamcService {

  constructor(private httpclient:HttpClient) { }
  createAMC(createamc:amc,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addcreateamc,createamc,{headers:{'key':key,'user':user}})
  }
}
