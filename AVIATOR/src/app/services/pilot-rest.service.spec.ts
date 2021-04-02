import { TestBed } from '@angular/core/testing';

import { PilotRESTService } from './pilot-rest.service';

describe('PilotRESTService', () => {
  let service: PilotRESTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PilotRESTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
