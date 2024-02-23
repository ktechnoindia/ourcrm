import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';
// Assuming `group` is defined in ledgergroup.service.ts
interface group {
  ledgrpname: string;
  parentgroupid: number;
  companyid: number;
  itemgroupname:string
}

@Injectable({
  providedIn: 'root'
})
export class LedgergroupService {

  constructor(private httpclient:HttpClient,private session:SessionService) { }
  createledgerGroup(groups:group,key:string,user:string){
    const token = this.session.getValue('token')?.valueOf();
    return this.httpclient.post(environment.apiactionurl+environment.additemgroup,groups, { headers: { 'key': '', 'user': '', 'Authorization': 'Bearer '+token }})
  }
  getledgerGroups(companyid:number): Observable<any> {
    const token = this.session.getValue('token')?.valueOf();
    return this.httpclient.get(environment.apibaseurl+environment.fetchallledegergroups+'?companyid='+companyid, { headers: { 'key': '', 'user': '', 'Authorization': 'Bearer '+token }});
  }
}
