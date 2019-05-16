import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesTypesComponent } from './activitiesTypes.component';

describe('ActivitiesTypesComponent', () => {
  let component: ActivitiesTypesComponent;
  let fixture: ComponentFixture<ActivitiesTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitiesTypesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
