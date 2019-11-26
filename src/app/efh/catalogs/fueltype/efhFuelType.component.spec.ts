import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhFuelTypeComponent } from './efhFuelType.component';

describe('EfhFuelTypeComponent', () => {
  let component: EfhFuelTypeComponent;
  let fixture: ComponentFixture<EfhFuelTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhFuelTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhFuelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
