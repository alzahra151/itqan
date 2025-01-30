import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveExectiveplanComponent } from './approve-exectiveplan.component';

describe('ApproveExectiveplanComponent', () => {
  let component: ApproveExectiveplanComponent;
  let fixture: ComponentFixture<ApproveExectiveplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveExectiveplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveExectiveplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
