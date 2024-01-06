// PopoverService.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopoverService {
  isOpen$ = new Subject<boolean>();

  togglePopover(isOpen: boolean): void {
    this.isOpen$.next(isOpen);
  }
}

