import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceHomeComponent } from './complianceHome.component';

describe('ComplianceHomeComponent', () => {
  let component: ComplianceHomeComponent;
  let fixture: ComponentFixture<ComplianceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
