import { TestBed } from '@angular/core/testing';

import { FileRESTService } from './file-rest.service';

describe('FileRESTService', () => {
  let service: FileRESTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileRESTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
