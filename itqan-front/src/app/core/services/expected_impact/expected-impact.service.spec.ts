import { TestBed } from '@angular/core/testing';

import { ExpectedImpactService } from './expected-impact.service';

describe('ExpectedImpactService', () => {
  let service: ExpectedImpactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpectedImpactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
