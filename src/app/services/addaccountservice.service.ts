import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';



export interface act{
 
  acName: string;
  acid: number;
  actype: string ;
  industry:string;
  priycontact:string;
  email:string;
  phone:number;
  acmanager:string;
  assignteam:string;
  acstatus:string;
 
}


@Injectable({
  providedIn: 'root'
})
export class AddaccountserviceService {

  constructor(private httpclient:HttpClient) { }
  createAccount(account:act,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addaccount,account,{headers:{'key':key,'user':user}})
  }
}
