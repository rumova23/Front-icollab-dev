import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetentStaffComponent } from './competentStaff.component';

describe('CompetentStaffComponent', () => {
  let component: CompetentStaffComponent;
  let fixture: ComponentFixture<CompetentStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompetentStaffComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetentStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
