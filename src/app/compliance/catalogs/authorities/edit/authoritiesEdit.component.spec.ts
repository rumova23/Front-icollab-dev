import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoritiesEditComponent } from './authoritiesEdit.component';

describe('AuthoritiesEditComponent', () => {
  let component: AuthoritiesEditComponent;
  let fixture: ComponentFixture<AuthoritiesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthoritiesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthoritiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
