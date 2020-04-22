import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafePPAMonitoringStationComponent } from './safe-ppamonitoring-station.component';

describe('SafePPAMonitoringStationComponent', () => {
  let component: SafePPAMonitoringStationComponent;
  let fixture: ComponentFixture<SafePPAMonitoringStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafePPAMonitoringStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafePPAMonitoringStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
