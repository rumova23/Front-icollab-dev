import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputTimeComponent } from './mat-input-time.component';

describe('MatInputTimeComponent', () => {
  let component: MatInputTimeComponent;
  let fixture: ComponentFixture<MatInputTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatInputTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatInputTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
