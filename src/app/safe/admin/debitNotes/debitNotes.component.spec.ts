import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitNotesComponent } from './debitNotes.component';

describe('DebitNotesComponent', () => {
  let component: DebitNotesComponent;
  let fixture: ComponentFixture<DebitNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebitNotesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
