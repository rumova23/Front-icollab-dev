import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchInvoiceSeriesEditComponent } from './branchInvoiceSeriesEdit.component';

describe('BranchInvoiceSeriesEditComponent', () => {
  let component: BranchInvoiceSeriesEditComponent;
  let fixture: ComponentFixture<BranchInvoiceSeriesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BranchInvoiceSeriesEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchInvoiceSeriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
