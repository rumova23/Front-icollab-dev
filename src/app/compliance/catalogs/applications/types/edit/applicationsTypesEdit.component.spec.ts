import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsTypesEditComponent } from './applicationsTypesEdit.component';

describe('ApplicationsTypesEditComponent', () => {
  let component: ApplicationsTypesEditComponent;
  let fixture: ComponentFixture<ApplicationsTypesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationsTypesEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsTypesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
