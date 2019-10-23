import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEditTaskComponent } from './template-edit-task.component';

describe('TemplateEditTaskComponent', () => {
  let component: TemplateEditTaskComponent;
  let fixture: ComponentFixture<TemplateEditTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateEditTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
