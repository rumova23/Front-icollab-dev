import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataqDcfEnergymetersComponent } from './dataq-dcf-energymeters.component';

describe('DataqDcfEnergymetersComponent', () => {
  let component: DataqDcfEnergymetersComponent;
  let fixture: ComponentFixture<DataqDcfEnergymetersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataqDcfEnergymetersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataqDcfEnergymetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
