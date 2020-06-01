import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeRegistrationOfEventsComponent } from './safe-registration-of-events.component';

describe('SafeRegistrationOfEventsComponent', () => {
  let component: SafeRegistrationOfEventsComponent;
  let fixture: ComponentFixture<SafeRegistrationOfEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeRegistrationOfEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeRegistrationOfEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
