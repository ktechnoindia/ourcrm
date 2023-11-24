import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface signup{
  salutation: number ;
  firstName: string;
  midName: string;
  lastName: string ;
  phone:string;
  email: string ;
  role: number;
  password: string;
  confirmpassword: string;
  selectedOption: number;
  selectedState: number;
  selectedDistrict: number;
  address: string;
  selectedarea:number;
}
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpclient:HttpClient) {
    
   }
   createsignup(signup:signup,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addsignup,signup,{headers:{'key':key,'user':user}})
  }
}
