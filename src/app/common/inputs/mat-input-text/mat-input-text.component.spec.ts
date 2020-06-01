import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputTextComponent } from './mat-input-text.component';

describe('MatInputTextComponent', () => {
  let component: MatInputTextComponent;
  let fixture: ComponentFixture<MatInputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatInputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
