import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeListOfEventsComponent } from './safe-list-of-events.component';

describe('SafeListOfEventsComponent', () => {
  let component: SafeListOfEventsComponent;
  let fixture: ComponentFixture<SafeListOfEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeListOfEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeListOfEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
