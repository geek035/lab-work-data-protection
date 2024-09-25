import { TestBed } from '@angular/core/testing';

import { UserPanelStateService } from './user-panel-state.service';

describe('UserPanelStateService', () => {
  let service: UserPanelStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPanelStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
