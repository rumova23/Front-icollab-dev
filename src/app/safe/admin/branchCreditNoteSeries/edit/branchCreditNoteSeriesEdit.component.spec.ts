import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCreditNoteSeriesEditComponent } from './branchCreditNoteSeriesEdit.component';

describe('BranchCreditNoteSeriesEditComponent', () => {
  let component: BranchCreditNoteSeriesEditComponent;
  let fixture: ComponentFixture<BranchCreditNoteSeriesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BranchCreditNoteSeriesEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchCreditNoteSeriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
