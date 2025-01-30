import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasedPlansComponent } from './phased-plans.component';

describe('PhasedPlansComponent', () => {
  let component: PhasedPlansComponent;
  let fixture: ComponentFixture<PhasedPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhasedPlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhasedPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
