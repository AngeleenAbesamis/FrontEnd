import { TestBed } from '@angular/core/testing';

import { ScriptSaveService } from './script-save.service';

describe('ScriptSaveService', () => {
  let service: ScriptSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
