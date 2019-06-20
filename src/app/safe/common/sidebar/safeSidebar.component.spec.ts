import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeSidebarComponent } from './safeSidebar.component';

describe('SafeSidebarComponent', () => {
  let component: SafeSidebarComponent;
  let fixture: ComponentFixture<SafeSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SafeSidebarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
