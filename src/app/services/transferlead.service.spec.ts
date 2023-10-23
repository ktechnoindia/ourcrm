import { TestBed } from '@angular/core/testing';

import { TransferleadService } from './transferlead.service';

describe('TransferleadService', () => {
  let service: TransferleadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferleadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
