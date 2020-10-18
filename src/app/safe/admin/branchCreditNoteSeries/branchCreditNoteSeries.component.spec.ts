import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCreditNoteSeriesComponent } from './branchCreditNoteSeries.component';

describe('BranchCreditNoteSeriesComponent', () => {
  let component: BranchCreditNoteSeriesComponent;
  let fixture: ComponentFixture<BranchCreditNoteSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BranchCreditNoteSeriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchCreditNoteSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
