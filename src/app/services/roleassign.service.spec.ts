import { TestBed } from '@angular/core/testing';

import { RoleassignService } from './roleassign.service';

describe('RoleassignService', () => {
  let service: RoleassignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleassignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
