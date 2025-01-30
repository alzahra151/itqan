import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveExectiveplanDetailsComponent } from './approve-exectiveplan-details.component';

describe('ApproveExectiveplanDetailsComponent', () => {
  let component: ApproveExectiveplanDetailsComponent;
  let fixture: ComponentFixture<ApproveExectiveplanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveExectiveplanDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveExectiveplanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
