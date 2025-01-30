import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcutivePlanDetailsComponent } from './excutive-plan-details.component';

describe('ExcutivePlanDetailsComponent', () => {
  let component: ExcutivePlanDetailsComponent;
  let fixture: ComponentFixture<ExcutivePlanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcutivePlanDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcutivePlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
