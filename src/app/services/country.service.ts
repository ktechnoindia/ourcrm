
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://neelkanthschool.com/v/mst.php?type=country'; 

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
