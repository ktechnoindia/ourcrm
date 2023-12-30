import { TestBed } from '@angular/core/testing';

import { QuantitypopoverService } from './quantitypopover.service';

describe('QuantitypopoverService', () => {
  let service: QuantitypopoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantitypopoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
