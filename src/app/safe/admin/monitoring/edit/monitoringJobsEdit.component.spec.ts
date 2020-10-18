import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringJobsEditComponent } from './monitoringJobsEdit.component';

describe('MonitoringJobsEditComponent', () => {
  let component: MonitoringJobsEditComponent;
  let fixture: ComponentFixture<MonitoringJobsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoringJobsEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringJobsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
