import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeEditComponent } from './chargeEdit.component';

describe('ChargeEditComponent', () => {
  let component: ChargeEditComponent;
  let fixture: ComponentFixture<ChargeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChargeEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
