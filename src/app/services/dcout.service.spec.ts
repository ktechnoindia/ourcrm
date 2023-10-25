import { TestBed } from '@angular/core/testing';

import { DcoutService } from './dcout.service';

describe('DcoutService', () => {
  let service: DcoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DcoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
