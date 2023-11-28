import { TestBed } from '@angular/core/testing';

import { RecepitService } from './recepit.service';

describe('RecepitService', () => {
  let service: RecepitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecepitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
