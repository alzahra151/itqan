import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExcutivePlanComponent } from './update-excutive-plan.component';

describe('UpdateExcutivePlanComponent', () => {
  let component: UpdateExcutivePlanComponent;
  let fixture: ComponentFixture<UpdateExcutivePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateExcutivePlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateExcutivePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
