import { TestBed } from '@angular/core/testing';

import { UserDataRequestService } from './user-data-request.service';

describe('UserDataRequestService', () => {
  let service: UserDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
