import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputDatepickerYearAndMonthComponent } from './mat-input-datepicker-year-and-month.component';

describe('MatInputDatepickerYearAndMonthComponent', () => {
  let component: MatInputDatepickerYearAndMonthComponent;
  let fixture: ComponentFixture<MatInputDatepickerYearAndMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatInputDatepickerYearAndMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatInputDatepickerYearAndMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
