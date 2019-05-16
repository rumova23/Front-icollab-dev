import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritySidebarComponent } from './securitySidebar.component';

describe('SecuritySidebarComponent', () => {
  let component: SecuritySidebarComponent;
  let fixture: ComponentFixture<SecuritySidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecuritySidebarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
