import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeEnergyMetersChartComponent } from './safe-energy-meters-chart.component';

describe('SafeEnergyMetersChartComponent', () => {
  let component: SafeEnergyMetersChartComponent;
  let fixture: ComponentFixture<SafeEnergyMetersChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeEnergyMetersChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeEnergyMetersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
