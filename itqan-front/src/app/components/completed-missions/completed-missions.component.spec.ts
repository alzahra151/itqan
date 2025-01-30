import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedMissionsComponent } from './completed-missions.component';

describe('CompletedMissionsComponent', () => {
  let component: CompletedMissionsComponent;
  let fixture: ComponentFixture<CompletedMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedMissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
