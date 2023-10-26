import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export interface vend{
      name:string;
      vendor_code: string;
      gstin: string;
      select_group: number;
      opening_balance: number;
      closing_balance: number;
      mobile: string;
      whatsapp_number: string;
      email:string;
      country: number;
      state: number
      district: number;
      pincode: string;
      address: string;
      tdn: string;
      aadhar_no: string;
      pan_no: string;
      udhyog_aadhar: string;
      account_number: string;
      ifsc_code: string;
      bank_name: string;
      branch_name: string;
      credit_period: number;
      credit_limit: number;
      select_sales_person: string;
      card_number: string;
      opening_point: number;
      closing_point: number;
      selectedSalutation: string;
      companyName: string;
  }
 
  @Injectable({
    providedIn: 'root'
  })
  export class VendorService {
  
    constructor(private httpclient:HttpClient) { }
  createVendor(vendor:vend,key:string,user:string){
    return this.httpclient.post(environment.apiactionurl+environment.addvend,vendor,{headers:{'key':key,'user':user}})
  }
  }