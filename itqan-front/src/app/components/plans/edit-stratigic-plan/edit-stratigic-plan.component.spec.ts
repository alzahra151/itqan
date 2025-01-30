import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStratigicPlanComponent } from './edit-stratigic-plan.component';

describe('EditStratigicPlanComponent', () => {
  let component: EditStratigicPlanComponent;
  let fixture: ComponentFixture<EditStratigicPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStratigicPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditStratigicPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
