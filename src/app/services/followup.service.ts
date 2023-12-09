import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface followuptable {
  followupdate: string;
  enterdby: string;
  remark:string;
  nextfollowupDate:string;
  custid:string;
  leadid:string;
  companyid:string;
  followupId:string;
}
@Injectable({
  providedIn: 'root'
})
export class FollowupService {
  constructor(private httpclient:HttpClient) { }
  createfollowup(followup:followuptable,key:string,user:string){
    return this.httpclient.post(environment.apiacturl+environment.addfollowup,followup,{headers:{'key':key,'user':user}})
  }

  fetchallfollowup(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiacturl+environment.fetchfollowup+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
  
}