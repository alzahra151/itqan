import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryEmployeesComponent } from './beneficiary-employees.component';

describe('BeneficiaryEmployeesComponent', () => {
  let component: BeneficiaryEmployeesComponent;
  let fixture: ComponentFixture<BeneficiaryEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryEmployeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeneficiaryEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
