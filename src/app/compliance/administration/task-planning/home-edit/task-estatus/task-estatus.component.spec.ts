import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEstatusComponent } from './task-estatus.component';

describe('TaskEstatusComponent', () => {
  let component: TaskEstatusComponent;
  let fixture: ComponentFixture<TaskEstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskEstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
