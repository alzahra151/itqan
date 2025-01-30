import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicPlanDetailsComponent } from './strategic-plan-details.component';

describe('StrategicPlanDetailsComponent', () => {
  let component: StrategicPlanDetailsComponent;
  let fixture: ComponentFixture<StrategicPlanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategicPlanDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StrategicPlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
