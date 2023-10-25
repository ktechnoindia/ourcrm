import { TestBed } from '@angular/core/testing';

import { RoleofexecutiveService } from './roleofexecutive.service';

describe('RoleofexecutiveService', () => {
  let service: RoleofexecutiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleofexecutiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
