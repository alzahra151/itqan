import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryDirectorBoardComponent } from './beneficiary-director-board.component';

describe('BeneficiaryDirectorBoardComponent', () => {
  let component: BeneficiaryDirectorBoardComponent;
  let fixture: ComponentFixture<BeneficiaryDirectorBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryDirectorBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeneficiaryDirectorBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
