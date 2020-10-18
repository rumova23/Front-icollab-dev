import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDatetimelocalComponent } from './mat-datetimelocal.component';

describe('MatDatetimelocalComponent', () => {
  let component: MatDatetimelocalComponent;
  let fixture: ComponentFixture<MatDatetimelocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatDatetimelocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDatetimelocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
