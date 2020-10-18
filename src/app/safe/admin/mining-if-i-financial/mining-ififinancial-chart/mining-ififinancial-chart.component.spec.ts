import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningIFIFinancialChartComponent } from './mining-ififinancial-chart.component';

describe('MiningIFIFinancialChartComponent', () => {
  let component: MiningIFIFinancialChartComponent;
  let fixture: ComponentFixture<MiningIFIFinancialChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningIFIFinancialChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningIFIFinancialChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
