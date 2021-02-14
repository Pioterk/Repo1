import { TestBed } from '@angular/core/testing';

import { DatapointService } from './datapoint.service';

describe('DatapointService', () => {
  let service: DatapointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatapointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
