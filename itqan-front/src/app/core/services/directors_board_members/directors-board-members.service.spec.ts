import { TestBed } from '@angular/core/testing';

import { DirectorsBoardMembersService } from './directors-board-members.service';

describe('DirectorsBoardMembersService', () => {
  let service: DirectorsBoardMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectorsBoardMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
