import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEvaluationHomeComponent } from './editEvaluationHome.component';

describe('EditEvaluationHomeComponent', () => {
  let component: EditEvaluationHomeComponent;
  let fixture: ComponentFixture<EditEvaluationHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEvaluationHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEvaluationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
