import { TestBed } from '@angular/core/testing';

import { AddexecutiveService } from './addexecutive.service';

describe('AddexecutiveService', () => {
  let service: AddexecutiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddexecutiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
