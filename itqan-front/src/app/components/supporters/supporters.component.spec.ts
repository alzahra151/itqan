import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportersComponent } from './supporters.component';

describe('SupportersComponent', () => {
  let component: SupportersComponent;
  let fixture: ComponentFixture<SupportersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
