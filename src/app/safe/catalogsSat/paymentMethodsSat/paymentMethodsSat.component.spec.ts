import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsSatComponent } from './paymentMethodsSat.component';

describe('PaymentMethodsSatComponent', () => {
  let component: PaymentMethodsSatComponent;
  let fixture: ComponentFixture<PaymentMethodsSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodsSatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodsSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
