import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafePpaMonitoringProfileStationComponent } from './safe-ppa-monitoring-profile-station.component';

describe('SafePpaMonitoringProfileStationComponent', () => {
  let component: SafePpaMonitoringProfileStationComponent;
  let fixture: ComponentFixture<SafePpaMonitoringProfileStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafePpaMonitoringProfileStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafePpaMonitoringProfileStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
