import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceAddStaffComponent } from './complianceAddStaff.component';

describe('ComplianceAddStaffComponent', () => {
  let component: ComplianceAddStaffComponent;
  let fixture: ComponentFixture<ComplianceAddStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceAddStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceAddStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
