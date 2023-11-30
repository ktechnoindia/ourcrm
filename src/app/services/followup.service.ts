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
  compid:string;
}
@Injectable({
  providedIn: 'root'
})
export class FollowupService {
  constructor(private httpclient:HttpClient) { }
  createfollowup(followup:followuptable,key:string,user:string){
    return this.httpclient.post(environment.apiacturl+environment.addfollowup,followup,{headers:{'key':key,'user':user}})
  }

  fetchallfollowup(compid:string,custid:string,leadid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+compid);
    return this.httpclient.get(environment.apiacturl+environment.fetchfollowup+'?p='+compid+custid+leadid,{headers:{'key':key,'user':user}})
  }
}