import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface unit{
  unit_name:string;
  short_name:string;
  primary_unit:number;
  decimal_place:number;
}


@Injectable({
  providedIn: 'root'
})
export class CreateunitService {

 
  constructor(private httpclient:HttpClient) { }
  createUnit(units:unit,key:string,user:string){
    return this.httpclient.post(environment.apibaseurl+environment.addunit,units,{headers:{'key':key,'user':user}})
  }


  fetchallunit(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apibaseurl+environment.fetchunit+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
}
