import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputPasswordComponent } from './mat-input-password.component';

describe('MatInputPasswordComponent', () => {
  let component: MatInputPasswordComponent;
  let fixture: ComponentFixture<MatInputPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatInputPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatInputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
