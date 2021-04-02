import { TestBed } from '@angular/core/testing';

import { UserRESTService } from './user-rest.service';

describe('UserRESTService', () => {
  let service: UserRESTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRESTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
