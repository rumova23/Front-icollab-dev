import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsTypesComponent } from './applicationsTypes.component';

describe('ApplicationsTypesComponent', () => {
  let component: ApplicationsTypesComponent;
  let fixture: ComponentFixture<ApplicationsTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationsTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
