import { TestBed } from '@angular/core/testing';

import { UpdatequoteService } from './updatequote.service';

describe('UpdatequoteService', () => {
  let service: UpdatequoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatequoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
