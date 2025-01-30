import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhasedPlanComponent } from './edit-phased-plan.component';

describe('EditPhasedPlanComponent', () => {
  let component: EditPhasedPlanComponent;
  let fixture: ComponentFixture<EditPhasedPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPhasedPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPhasedPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
