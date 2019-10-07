import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringPhase3Component } from './monitoring-phase3.component';

describe('MonitoringPhase3Component', () => {
  let component: MonitoringPhase3Component;
  let fixture: ComponentFixture<MonitoringPhase3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoringPhase3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringPhase3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
