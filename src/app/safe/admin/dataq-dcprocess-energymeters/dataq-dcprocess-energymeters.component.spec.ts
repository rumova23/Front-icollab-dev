import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataqDcprocessEnergymetersComponent } from './dataq-dcprocess-energymeters.component';

describe('DataqDcprocessEnergymetersComponent', () => {
  let component: DataqDcprocessEnergymetersComponent;
  let fixture: ComponentFixture<DataqDcprocessEnergymetersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataqDcprocessEnergymetersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataqDcprocessEnergymetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
