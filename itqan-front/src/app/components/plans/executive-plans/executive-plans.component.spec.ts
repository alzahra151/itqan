import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutivePlansComponent } from './executive-plans.component';

describe('ExecutivePlansComponent', () => {
  let component: ExecutivePlansComponent;
  let fixture: ComponentFixture<ExecutivePlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutivePlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExecutivePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
