import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputTextareaComponent } from './mat-input-textarea.component';

describe('MatInputTextareaComponent', () => {
  let component: MatInputTextareaComponent;
  let fixture: ComponentFixture<MatInputTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatInputTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatInputTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
