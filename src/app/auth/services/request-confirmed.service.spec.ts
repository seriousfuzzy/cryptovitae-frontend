import { TestBed } from '@angular/core/testing';

import { RequestConfirmedService } from './request-confirmed.service';

describe('RequestConfirmedService', () => {
  let service: RequestConfirmedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestConfirmedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
