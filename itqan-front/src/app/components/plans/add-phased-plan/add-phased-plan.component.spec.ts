import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhasedPlanComponent } from './add-phased-plan.component';

describe('AddPhasedPlanComponent', () => {
  let component: AddPhasedPlanComponent;
  let fixture: ComponentFixture<AddPhasedPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPhasedPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPhasedPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
