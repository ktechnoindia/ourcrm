import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StocktypeService {
  stocktypename:string='';


  constructor(private httpclient: HttpClient) {

   }
   getStockTypes(companyid:number): Observable<any> {
    return this.httpclient.get(environment.apibaseurl+environment.fetchstocktype+'?companyid='+companyid);
  }
}
