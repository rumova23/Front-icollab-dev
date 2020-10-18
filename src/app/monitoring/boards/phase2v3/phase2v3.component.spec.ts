import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Phase2v3Component } from './phase2v3.component';

describe('Phase2v3Component', () => {
  let component: Phase2v3Component;
  let fixture: ComponentFixture<Phase2v3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phase2v3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phase2v3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
