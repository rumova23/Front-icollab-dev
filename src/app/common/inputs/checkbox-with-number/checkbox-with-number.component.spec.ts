import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxWithNumberComponent } from './checkbox-with-number.component';

describe('CheckboxWithNumberComponent', () => {
  let component: CheckboxWithNumberComponent;
  let fixture: ComponentFixture<CheckboxWithNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxWithNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxWithNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
