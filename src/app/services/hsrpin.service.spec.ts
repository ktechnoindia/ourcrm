import { TestBed } from '@angular/core/testing';

import { HsrpinService } from './hsrpin.service';

describe('HsrpinService', () => {
  let service: HsrpinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HsrpinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
