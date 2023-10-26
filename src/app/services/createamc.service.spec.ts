import { TestBed } from '@angular/core/testing';

import { CreateamcService } from './createamc.service';

describe('CreateamcService', () => {
  let service: CreateamcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateamcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
