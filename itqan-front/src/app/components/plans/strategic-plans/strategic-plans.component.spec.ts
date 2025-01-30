import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicPlansComponent } from './strategic-plans.component';

describe('StrategicPlansComponent', () => {
  let component: StrategicPlansComponent;
  let fixture: ComponentFixture<StrategicPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategicPlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StrategicPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
