import { TestBed } from '@angular/core/testing';

import { GsttypeService } from './gsttype.service';

describe('GsttypeService', () => {
  let service: GsttypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsttypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
