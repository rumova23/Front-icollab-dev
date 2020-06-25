import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableBillingComponent } from './mat-table-billing.component';

describe('MatTableBillingComponent', () => {
  let component: MatTableBillingComponent;
  let fixture: ComponentFixture<MatTableBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatTableBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
