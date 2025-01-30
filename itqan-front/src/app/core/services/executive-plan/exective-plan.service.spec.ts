import { TestBed } from '@angular/core/testing';

import { ExectivePlanService } from './exective-plan.service';

describe('ExectivePlanService', () => {
  let service: ExectivePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExectivePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
