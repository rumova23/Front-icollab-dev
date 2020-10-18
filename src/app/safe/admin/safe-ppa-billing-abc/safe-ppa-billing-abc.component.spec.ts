import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafePpaBillingAbcComponent } from './safe-ppa-billing-abc.component';

describe('SafePpaBillingAbcComponent', () => {
  let component: SafePpaBillingAbcComponent;
  let fixture: ComponentFixture<SafePpaBillingAbcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafePpaBillingAbcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafePpaBillingAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
