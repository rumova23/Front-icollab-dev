import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceTypesEditComponent } from './complianceTypesEdit.component';

describe('ComplianceTypesEditComponent', () => {
  let component: ComplianceTypesEditComponent;
  let fixture: ComponentFixture<ComplianceTypesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComplianceTypesEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceTypesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
