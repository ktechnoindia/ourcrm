import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  showHeader: boolean = true;
  constructor() { }
}
