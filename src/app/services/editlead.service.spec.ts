import { TestBed } from '@angular/core/testing';

import { EditleadService } from './editlead.service';

describe('EditleadService', () => {
  let service: EditleadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditleadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
