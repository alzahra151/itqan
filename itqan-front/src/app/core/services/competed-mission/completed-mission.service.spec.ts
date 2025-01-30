import { TestBed } from '@angular/core/testing';

import { CompletedMissionService } from './completed-mission.service';

describe('CompletedMissionService', () => {
  let service: CompletedMissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedMissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
