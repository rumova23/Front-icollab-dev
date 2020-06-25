import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafePpaBillingComponent } from './safe-ppa-billing.component';

describe('SafePpaBillingComponent', () => {
  let component: SafePpaBillingComponent;
  let fixture: ComponentFixture<SafePpaBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafePpaBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafePpaBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
