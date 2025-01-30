import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExecutivePlanComponent } from './add-executive-plan.component';

describe('AddExecutivePlanComponent', () => {
  let component: AddExecutivePlanComponent;
  let fixture: ComponentFixture<AddExecutivePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExecutivePlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExecutivePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
