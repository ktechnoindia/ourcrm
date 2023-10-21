import { TestBed } from '@angular/core/testing';

import { CgsttypeService } from './cgsttype.service';

describe('CgsttypeService', () => {
  let service: CgsttypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CgsttypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
