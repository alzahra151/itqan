import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMissionsComponent } from './employee-missions.component';

describe('EmployeeMissionsComponent', () => {
  let component: EmployeeMissionsComponent;
  let fixture: ComponentFixture<EmployeeMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeMissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
