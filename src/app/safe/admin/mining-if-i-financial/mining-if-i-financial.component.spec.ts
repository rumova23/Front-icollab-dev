import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningIFIFinancialComponent } from './mining-if-i-financial.component';

describe('MiningIFIFinancialComponent', () => {
  let component: MiningIFIFinancialComponent;
  let fixture: ComponentFixture<MiningIFIFinancialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningIFIFinancialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningIFIFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
