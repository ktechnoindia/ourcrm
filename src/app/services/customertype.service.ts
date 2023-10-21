 import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { environment } from 'src/environments/environment';
  
  @Injectable({
    providedIn: 'root'
  })
  export class CustomertypeService {
    constructor(private http: HttpClient) {}
  
    getcustomertype(): Observable<any> {
      return this.http.get(environment.apibaseurl+environment.fetchcustomertype);
    }
  }
  
