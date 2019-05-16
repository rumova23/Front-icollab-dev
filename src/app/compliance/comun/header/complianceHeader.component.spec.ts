import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceHeaderComponent } from './complianceHeader.component';

describe('ComplianceHeaderComponent', () => {
  let component: ComplianceHeaderComponent;
  let fixture: ComponentFixture<ComplianceHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
