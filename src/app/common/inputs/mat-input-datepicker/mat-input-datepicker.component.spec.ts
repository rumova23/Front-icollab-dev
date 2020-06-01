import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputDatepickerComponent } from './mat-input-datepicker.component';

describe('MatInputDatepickerComponent', () => {
  let component: MatInputDatepickerComponent;
  let fixture: ComponentFixture<MatInputDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatInputDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatInputDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
