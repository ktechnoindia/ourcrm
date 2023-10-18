import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MyService {
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
