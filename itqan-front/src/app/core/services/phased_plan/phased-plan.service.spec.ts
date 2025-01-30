import { TestBed } from '@angular/core/testing';

import { PhasedPlanService } from './phased-plan.service';

describe('PhasedPlanService', () => {
  let service: PhasedPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhasedPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
