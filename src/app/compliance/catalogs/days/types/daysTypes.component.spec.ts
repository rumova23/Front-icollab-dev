import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysTypesComponent } from './daysTypes.component';

describe('DaysTypesComponent', () => {
  let component: DaysTypesComponent;
  let fixture: ComponentFixture<DaysTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DaysTypesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
