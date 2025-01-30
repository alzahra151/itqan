import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { missionGuard } from './mission.guard';

describe('missionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => missionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
