import { TestBed } from '@angular/core/testing';

import { LedgergroupService } from './ledgergroup.service';

describe('LedgergroupService', () => {
  let service: LedgergroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LedgergroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
