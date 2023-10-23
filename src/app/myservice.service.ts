import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { followuptable } from './services/followup.service';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  createfollowup(leaddata: followuptable, arg1: string, arg2: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Correct API URL

  constructor(private http: HttpClient) {}

  postData(formData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(this.apiUrl, formData, httpOptions);
  }
}
