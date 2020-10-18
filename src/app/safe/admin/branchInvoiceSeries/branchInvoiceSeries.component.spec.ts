import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchInvoiceSeriesComponent } from './branchInvoiceSeries.component';

describe('BranchInvoiceSeriesComponent', () => {
  let component: BranchInvoiceSeriesComponent;
  let fixture: ComponentFixture<BranchInvoiceSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BranchInvoiceSeriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchInvoiceSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
