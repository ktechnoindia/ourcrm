import { TestBed } from '@angular/core/testing';

import { CreateunitService } from './createunit.service';

describe('CreateunitService', () => {
  let service: CreateunitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateunitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
