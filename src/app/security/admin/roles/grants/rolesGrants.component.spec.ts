import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesGrantsComponent } from './rolesGrants.component';

describe('RolesGrantsComponent', () => {
  let component: RolesGrantsComponent;
  let fixture: ComponentFixture<RolesGrantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RolesGrantsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesGrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
