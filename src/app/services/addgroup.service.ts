import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface group{
  itemgroupname: string,
  companyid: number,
  parentgroupid: number
}

@Injectable({
  providedIn: 'root'
})
export class AddgroupService {

  constructor(private httpclient:HttpClient) { }
  createGroup(groups:group,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.additemgroup,groups,{headers:{'key':key,'user':user}})
  }
  getAllGroups(companyid:number): Observable<any> {
    return this.httpclient.get(environment.apibaseurl+environment.fetchallitemgroups+'?companyid='+companyid);
  }
}
