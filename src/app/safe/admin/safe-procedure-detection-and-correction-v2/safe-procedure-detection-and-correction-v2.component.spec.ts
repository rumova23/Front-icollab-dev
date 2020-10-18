import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeProcedureDetectionAndCorrectionV2Component } from './safe-procedure-detection-and-correction-v2.component';

describe('SafeProcedureDetectionAndCorrectionV2Component', () => {
  let component: SafeProcedureDetectionAndCorrectionV2Component;
  let fixture: ComponentFixture<SafeProcedureDetectionAndCorrectionV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeProcedureDetectionAndCorrectionV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeProcedureDetectionAndCorrectionV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
