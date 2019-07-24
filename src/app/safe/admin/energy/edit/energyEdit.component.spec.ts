import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEditComponent } from './energyEdit.component';

describe('EnergyEditComponent', () => {
  let component: EnergyEditComponent;
  let fixture: ComponentFixture<EnergyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnergyEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
