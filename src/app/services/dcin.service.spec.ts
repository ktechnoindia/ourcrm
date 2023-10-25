import { TestBed } from '@angular/core/testing';

import { DcinService } from './dcin.service';

describe('DcinService', () => {
  let service: DcinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DcinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
