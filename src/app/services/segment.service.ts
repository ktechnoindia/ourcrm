import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {
  constructor(private http: HttpClient) {}

  getsegments(): Observable<any> {
    return this.http.get(environment.apibaseurl+environment.fetchsegment);
  }
}
