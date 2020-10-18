import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitNotesEditComponent } from './debitNotesEdit.component';

describe('DebitNotesEditComponent', () => {
  let component: DebitNotesEditComponent;
  let fixture: ComponentFixture<DebitNotesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebitNotesEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitNotesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
