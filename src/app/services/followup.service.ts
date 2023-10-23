import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface followuptable {

  leadName: string;
  companyName:string;
  email: string;
  phoneNumber: string;
  leadStatus : string;
}
@Injectable({
  providedIn: 'root'
})
export class FollowupService {
  constructor(private httpclient:HttpClient) { }
  createfollowup(followup:followuptable,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addfollowup,followup,{headers:{'key':key,'user':user}})
  }
}