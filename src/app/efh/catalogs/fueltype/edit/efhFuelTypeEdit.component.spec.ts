import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhFuelTypeEditComponent } from './efhFuelTypeEdit.component';

describe('EfhFuelTypeEditComponent', () => {
  let component: EfhFuelTypeEditComponent;
  let fixture: ComponentFixture<EfhFuelTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhFuelTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhFuelTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
