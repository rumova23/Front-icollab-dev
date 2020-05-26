import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputTextAutocompleteComponent } from './mat-input-text-autocomplete.component';

describe('MatInputTextAutocompleteComponent', () => {
  let component: MatInputTextAutocompleteComponent;
  let fixture: ComponentFixture<MatInputTextAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatInputTextAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatInputTextAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
