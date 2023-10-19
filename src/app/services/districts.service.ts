
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictsService{

  constructor(private http: HttpClient) {}

  getDistricts(districtsid:number): Observable<any> {
    return this.http.get(environment.apibaseurl+environment.fetchalldistrict+'/'+districtsid);
  }
}
