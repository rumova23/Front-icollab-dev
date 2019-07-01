import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuecdInvoiceComponent } from './fuecdInvoice.component';

describe('FuecdInvoiceComponent', () => {
  let component: FuecdInvoiceComponent;
  let fixture: ComponentFixture<FuecdInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FuecdInvoiceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuecdInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
