import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxWithSelectMultipleComponent } from './checkbox-with-select-multiple.component';

describe('CheckboxWithSelectMultipleComponent', () => {
  let component: CheckboxWithSelectMultipleComponent;
  let fixture: ComponentFixture<CheckboxWithSelectMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxWithSelectMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxWithSelectMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
