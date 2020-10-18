import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxWithInputTextComponent } from './checkbox-with-input-text.component';

describe('CheckboxWithInputTextComponent', () => {
  let component: CheckboxWithInputTextComponent;
  let fixture: ComponentFixture<CheckboxWithInputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxWithInputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxWithInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
