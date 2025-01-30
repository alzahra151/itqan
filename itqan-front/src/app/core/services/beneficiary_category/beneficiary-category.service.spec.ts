import { TestBed } from '@angular/core/testing';

import { BeneficiaryCategoryService } from './beneficiary-category.service';

describe('BeneficiaryCategoryService', () => {
  let service: BeneficiaryCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiaryCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
