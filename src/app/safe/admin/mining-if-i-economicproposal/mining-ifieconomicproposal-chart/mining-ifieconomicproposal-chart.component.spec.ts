import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningIFIEconomicproposalChartComponent } from './mining-ifieconomicproposal-chart.component';

describe('MiningIFIEconomicproposalChartComponent', () => {
  let component: MiningIFIEconomicproposalChartComponent;
  let fixture: ComponentFixture<MiningIFIEconomicproposalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningIFIEconomicproposalChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningIFIEconomicproposalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
