import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceSidebarComponent } from './complianceSidebar.component';

describe('ComplianceSidebarComponent', () => {
  let component: ComplianceSidebarComponent;
  let fixture: ComponentFixture<ComplianceSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComplianceSidebarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
