import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceConfigurationComponent } from './complianceConfiguration.component';

describe('ComplianceConfigurationComponent', () => {
  let component: ComplianceConfigurationComponent;
  let fixture: ComponentFixture<ComplianceConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComplianceConfigurationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
