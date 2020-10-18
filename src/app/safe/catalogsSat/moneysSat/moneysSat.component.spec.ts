import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneysSatComponent } from './moneysSat.component';

describe('MoneysSatComponent', () => {
  let component: MoneysSatComponent;
  let fixture: ComponentFixture<MoneysSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoneysSatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneysSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
