import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
    return this.httpclient.post(environment.apiactionurl+environment.addUnit,units,{headers:{'key':key,'user':user}})
  }
}
