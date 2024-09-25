import { TestBed } from '@angular/core/testing';

import { UserUpdateDataService } from './user-update-data.service';

describe('UserUpdateDataService', () => {
  let service: UserUpdateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserUpdateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
