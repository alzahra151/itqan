import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStakeholderComponent } from './add-stakeholder.component';

describe('AddStakeholderComponent', () => {
  let component: AddStakeholderComponent;
  let fixture: ComponentFixture<AddStakeholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStakeholderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStakeholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
