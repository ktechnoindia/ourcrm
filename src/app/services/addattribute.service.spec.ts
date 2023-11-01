import { TestBed } from '@angular/core/testing';

import { AddattributeService } from './addattribute.service';

describe('AddattributeService', () => {
  let service: AddattributeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddattributeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
