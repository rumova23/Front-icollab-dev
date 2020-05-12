import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Phase3v4Component } from './phase3v4.component';

describe('Phase3v4Component', () => {
  let component: Phase3v4Component;
  let fixture: ComponentFixture<Phase3v4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phase3v4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phase3v4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
