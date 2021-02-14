import { TestBed } from '@angular/core/testing';

import { GenertedReportService } from './generted-report.service';

describe('GenertedReportService', () => {
  let service: GenertedReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenertedReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
