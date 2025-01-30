import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStratgyPlanComponent } from './add-stratgy-plan.component';

describe('AddStratgyPlanComponent', () => {
  let component: AddStratgyPlanComponent;
  let fixture: ComponentFixture<AddStratgyPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStratgyPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStratgyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
