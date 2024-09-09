import { TestBed } from '@angular/core/testing';

import { ChatAzizService } from './chat-aziz.service';

describe('ChatAzizService', () => {
  let service: ChatAzizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatAzizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
