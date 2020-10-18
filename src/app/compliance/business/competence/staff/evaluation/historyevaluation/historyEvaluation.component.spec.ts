import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryEvaluationComponent } from './historyEvaluation.component';

describe('HistoryEvaluationComponent', () => {
  let component: HistoryEvaluationComponent;
  let fixture: ComponentFixture<HistoryEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
