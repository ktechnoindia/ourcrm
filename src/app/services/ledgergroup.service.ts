import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// Assuming `group` is defined in ledgergroup.service.ts
interface group {
  ledgrpname: string;
  parentgroupid: any;
  companyid: number;
}

@Injectable({
  providedIn: 'root'
})
export class LedgergroupService {

  constructor(private httpclient:HttpClient) { }
  createledgerGroup(groups:group,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.additemgroup,groups,{headers:{'key':key,'user':user}})
  }
  getledgerGroups(companyid:number): Observable<any> {
    return this.httpclient.get(environment.apibaseurl+environment.fetchallledegergroups+'?companyid='+companyid);
  }
}
