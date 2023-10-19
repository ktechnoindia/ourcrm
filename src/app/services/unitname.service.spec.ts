import { TestBed } from '@angular/core/testing';

import { UnitnameService } from './unitname.service';

describe('UnitnameService', () => {
  let service: UnitnameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitnameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
