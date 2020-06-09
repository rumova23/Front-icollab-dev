import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningIFISalaryincreaseChartComponent } from './mining-ifisalaryincrease-chart.component';

describe('MiningIFISalaryincreaseChartComponent', () => {
  let component: MiningIFISalaryincreaseChartComponent;
  let fixture: ComponentFixture<MiningIFISalaryincreaseChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningIFISalaryincreaseChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningIFISalaryincreaseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
