import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesTypesEditComponent } from './activitiesTypesEdit.component';

describe('ActivitiesTypesEditComponent', () => {
  let component: ActivitiesTypesEditComponent;
  let fixture: ComponentFixture<ActivitiesTypesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitiesTypesEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesTypesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
