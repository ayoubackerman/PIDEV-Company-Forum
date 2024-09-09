import { TestBed } from '@angular/core/testing';

import { KeycloakrestapiService } from './keycloakrestapi.service';

describe('KeycloakrestapiService', () => {
  let service: KeycloakrestapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakrestapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
