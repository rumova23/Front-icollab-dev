import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskObservacionComponent } from './task-observacion.component';

describe('TaskObservacionComponent', () => {
  let component: TaskObservacionComponent;
  let fixture: ComponentFixture<TaskObservacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskObservacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
