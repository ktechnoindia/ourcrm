import { TestBed } from '@angular/core/testing';

import { HsrpoutService } from './hsrpout.service';

describe('HsrpoutService', () => {
  let service: HsrpoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HsrpoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
