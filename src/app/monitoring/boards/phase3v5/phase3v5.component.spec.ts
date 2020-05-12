import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Phase3v5Component } from './phase3v5.component';

describe('Phase3v5Component', () => {
  let component: Phase3v5Component;
  let fixture: ComponentFixture<Phase3v5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phase3v5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phase3v5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
