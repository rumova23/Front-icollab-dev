import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialIndexesComponent } from './financialIndexes.component';

describe('FinancialIndexesComponent', () => {
  let component: FinancialIndexesComponent;
  let fixture: ComponentFixture<FinancialIndexesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialIndexesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialIndexesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
