import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceTypesComponent } from './complianceTypes.component';

describe('ComplianceTypesComponent', () => {
  let component: ComplianceTypesComponent;
  let fixture: ComponentFixture<ComplianceTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
