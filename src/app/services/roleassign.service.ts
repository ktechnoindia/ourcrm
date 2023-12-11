import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface roleassign{
  all_sale:boolean;
new_sale :boolean;
view_sale :boolean;
edit_sale:boolean;
delete_sale:boolean;
print_sale:boolean;
all_purchase:boolean;
new_purchase:boolean;
view_purchase:boolean;
edit_purchase:boolean;
delete_purchase:boolean;
print_purchase:boolean;
all_quote:boolean;
new_quote:boolean;
view_quote:boolean;
edit_quote:boolean;
delete_quote:boolean;
print_quote:boolean;
all_challan:boolean;
new_challan:boolean;
view_challan:boolean;
edit_challan:boolean;
delete_challan:boolean;
print_challan:boolean;
all_lms:boolean;
new_lms:boolean;
view_lms:boolean;
edit_lms:boolean;
delete_lms:boolean;
print_lms:boolean;
all_amc:boolean;
new_amc:boolean;
view_amc:boolean;
edit_amc:boolean;
delete_amc:boolean;
print_amc:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RoleassignService {

  constructor(private httpclient:HttpClient) { }

  createRoleassign(roles:roleassign,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addroleassign,roles,{headers:{'key':key,'user':user}})
  }
}
