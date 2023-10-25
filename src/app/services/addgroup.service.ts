import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


export interface group{
  igname:string;
  agname:string;
  description:string;
}

@Injectable({
  providedIn: 'root'
})
export class AddgroupService {

  constructor(private httpclient:HttpClient) { }
  createGroup(groups:group,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addgroup,groups,{headers:{'key':key,'user':user}})
  }
}
