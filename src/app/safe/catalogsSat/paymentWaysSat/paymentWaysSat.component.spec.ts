import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWaysSatComponent } from './paymentWaysSat.component';

describe('PaymentWaysSatComponent', () => {
  let component: PaymentWaysSatComponent;
  let fixture: ComponentFixture<PaymentWaysSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentWaysSatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWaysSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
