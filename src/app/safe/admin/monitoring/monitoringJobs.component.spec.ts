import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringJobsComponent } from './monitoringJobs.component';

describe('MonitoringJobsComponent', () => {
  let component: MonitoringJobsComponent;
  let fixture: ComponentFixture<MonitoringJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoringJobsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
