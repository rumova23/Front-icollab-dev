import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringWelcomeComponent } from './monitoring-welcome.component';

describe('MonitoringWelcomeComponent', () => {
  let component: MonitoringWelcomeComponent;
  let fixture: ComponentFixture<MonitoringWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoringWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
