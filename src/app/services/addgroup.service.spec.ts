import { TestBed } from '@angular/core/testing';

import { AddgroupService } from './addgroup.service';

describe('AddgroupService', () => {
  let service: AddgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
