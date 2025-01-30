import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBenficiaryDetailsComponent } from './get-benficiary-details.component';

describe('GetBenficiaryDetailsComponent', () => {
  let component: GetBenficiaryDetailsComponent;
  let fixture: ComponentFixture<GetBenficiaryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetBenficiaryDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetBenficiaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
