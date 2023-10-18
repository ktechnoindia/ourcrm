import { TestBed } from '@angular/core/testing';

import { roletypesservice } from './roletypes.service';

describe('RoletypesService', () => {
  let service: roletypesservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(roletypesservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
