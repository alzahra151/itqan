import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyeeMissionDetailsComponent } from './emplyee-mission-details.component';

describe('EmplyeeMissionDetailsComponent', () => {
  let component: EmplyeeMissionDetailsComponent;
  let fixture: ComponentFixture<EmplyeeMissionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmplyeeMissionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmplyeeMissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
