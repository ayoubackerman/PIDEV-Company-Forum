import { TestBed } from '@angular/core/testing';

import { BidServiceService } from './bid-service.service';

describe('BidServiceService', () => {
  let service: BidServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BidServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
