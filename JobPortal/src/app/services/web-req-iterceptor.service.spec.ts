import { TestBed } from '@angular/core/testing';

import { WebReqIterceptorService } from './web-req-iterceptor.service';

describe('WebReqIterceptorService', () => {
  let service: WebReqIterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebReqIterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
