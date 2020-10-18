import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputCheckboxComponent } from './mat-input-checkbox.component';

describe('MatInputCheckboxComponent', () => {
  let component: MatInputCheckboxComponent;
  let fixture: ComponentFixture<MatInputCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatInputCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatInputCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
