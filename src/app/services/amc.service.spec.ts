import { TestBed } from '@angular/core/testing';

import { AmcService } from './amc.service';

describe('AmcService', () => {
  let service: AmcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
