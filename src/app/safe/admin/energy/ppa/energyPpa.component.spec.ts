import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyPpaComponent } from './energyPpa.component'

describe('EnergyPpaComponent', () => {
  let component: EnergyPpaComponent;
  let fixture: ComponentFixture<EnergyPpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnergyPpaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyPpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
