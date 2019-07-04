import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNotesEditComponent } from './creditNotesEdit.component';

describe('CreditNotesEditComponent', () => {
  let component: CreditNotesEditComponent;
  let fixture: ComponentFixture<CreditNotesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreditNotesEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditNotesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
