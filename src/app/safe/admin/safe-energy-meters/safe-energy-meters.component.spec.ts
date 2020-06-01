import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeEnergyMetersComponent } from './safe-energy-meters.component';

describe('SafeEnergyMetersComponent', () => {
  let component: SafeEnergyMetersComponent;
  let fixture: ComponentFixture<SafeEnergyMetersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeEnergyMetersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeEnergyMetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
