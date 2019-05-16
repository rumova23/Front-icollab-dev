import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBComponent } from './dashboard-b.component';

describe('DashboardBComponent', () => {
  let component: DashboardBComponent;
  let fixture: ComponentFixture<DashboardBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
