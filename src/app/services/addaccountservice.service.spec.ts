import { TestBed } from '@angular/core/testing';

import { AddaccountserviceService } from './addaccountservice.service';

describe('AddaccountserviceService', () => {
  let service: AddaccountserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddaccountserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
