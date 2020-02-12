import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Phase2v1Component } from './phase2v1.component';

describe('Phase2v1Component', () => {
  let component: Phase2v1Component;
  let fixture: ComponentFixture<Phase2v1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phase2v1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phase2v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
