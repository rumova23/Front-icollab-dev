import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSelectMultipleComponent } from './mat-select-multiple.component';

describe('MatSelectMultipleComponent', () => {
  let component: MatSelectMultipleComponent;
  let fixture: ComponentFixture<MatSelectMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatSelectMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatSelectMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
