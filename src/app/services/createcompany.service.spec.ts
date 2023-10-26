import { TestBed } from '@angular/core/testing';

import { CreatecompanyService } from './createcompany.service';

describe('CreatecompanyService', () => {
  let service: CreatecompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatecompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
