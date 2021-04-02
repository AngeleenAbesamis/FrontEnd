import { TestBed } from '@angular/core/testing';

import { ScriptGetService } from './script-get.service';

describe('ScriptGetService', () => {
  let service: ScriptGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
