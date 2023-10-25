import { TestBed } from '@angular/core/testing';

import { LegderService } from './legder.service';

describe('LegderService', () => {
  let service: LegderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
