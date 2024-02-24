import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface cust{

  selectedSalutation: string;
  companyName: string;
  state: number;
  district: number;
  name: string;

  customer_code: string;
  country: number;
  opening_balance: number;
  closing_balance: number;
  mobile: string;
  whatsapp_number: string;
  address: string;
  gstin: string ;
  email: string ;
  select_sales_person: string;
  pincode: string ;
  tdn: string;
  aadhar_no: string ;
  pan_no: string;
  udhyog_aadhar: string;
  account_number: string;
  ifsc_code: string;
  bank_name: string;
  branch_name: string;
  credit_period: number;
  credit_limit: number;
  card_number: string;
  opening_point: number;
  closing_point: number;
  select_group: number;
  discount: number;
  selectedOption1: number;
  selectedState1: number;
  selectedDistrict1: number;
  pincode1: string;
  address1: string;
companyid:number;
  }
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  fetchCustomerById(customerId: (customerId: any) => Observable<any[]>): Observable<any[]> {
    throw new Error('Method not implemented.');
  }
  generateExcel: any;
 

  constructor(private httpclient:HttpClient) { }
  createCustomer(customer:cust,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addcust,customer,{headers:{'key':key,'user':user}})
  }
  fetchallCustomer(companyid:string,key:string,user:string): Observable<any> {
    console.log('companyyy '+companyid);
    return this.httpclient.get(environment.apiactionurl+environment.fetchallcust+'?p='+companyid,{headers:{'key':key,'user':user}})
  }
  getCustomer(companyid:number): Observable<any> {
    return this.httpclient.get(environment.apiactionurl+environment.fetchallcust);
  }
  deleteCustomer(customerid: number, companyid: number): Observable<any> {
    return this.httpclient.post(`${environment.apiactionurl}${environment.deleteCustomer}/${customerid}/${companyid}`,{});
  }
  editCustomer(customerid :number,key:string,user:string){
    return this.httpclient.post(environment.apibaseurl+environment.editcust,customerid ,{headers:{'key':key,'user':user}})
  }
}
