import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
export interface followuptable {

  followupdate: string;
  enterdby: string;
  remark:string;
  nextfollowupDate:string;
  custid:number;
  leadid:number;
  companyid:number;
  // followupId:string;
  leadstatus: string;
}
@Injectable({
  providedIn: 'root'
})
export class FollowupService {
  constructor(private httpclient:HttpClient) { }
  createfollowup(followup:followuptable,key:string,user:string){
    return this.httpclient.post(environment.apiacturl+environment.addfollowup,followup,{headers:{'key':key,'user':user}})
  }

  // fetchallfollowup(companyid:string,key:string,user:string): Observable<any> {
  //   console.log('companyyy '+companyid);
  //   return this.httpclient.get(environment.apiacturl+environment.fetchfollowup+'?p='+companyid,{headers:{'key':key,'user':user}})
  // }

  fetchallfollowup(companyid: string,leadid:string, key: string, user: string): Observable<any> {
    console.log('companyyy ' + companyid);
  
    // Build the query parameters using HttpParams
    const params = new HttpParams()
      .set('p', companyid)
      .set('l', leadid); 
    return this.httpclient.get(environment.apiacturl + environment.fetchfollowup, { headers: { 'key': key, 'user': user }, params });
  }


  
}





