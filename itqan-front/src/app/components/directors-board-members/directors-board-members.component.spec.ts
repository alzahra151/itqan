import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorsBoardMembersComponent } from './directors-board-members.component';

describe('DirectorsBoardMembersComponent', () => {
  let component: DirectorsBoardMembersComponent;
  let fixture: ComponentFixture<DirectorsBoardMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectorsBoardMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectorsBoardMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
