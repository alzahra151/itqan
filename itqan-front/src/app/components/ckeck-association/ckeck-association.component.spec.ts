import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeckAssociationComponent } from './ckeck-association.component';

describe('CkeckAssociationComponent', () => {
  let component: CkeckAssociationComponent;
  let fixture: ComponentFixture<CkeckAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CkeckAssociationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CkeckAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
