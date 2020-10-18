import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxWithSelectComponent } from './checkbox-with-select.component';

describe('CheckboxWithSelectComponent', () => {
  let component: CheckboxWithSelectComponent;
  let fixture: ComponentFixture<CheckboxWithSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxWithSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxWithSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
