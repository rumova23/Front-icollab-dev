import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeListBinnacleEventsComponent } from './safe-list-binnacle-events.component';

describe('SafeListBinnacleEventsComponent', () => {
  let component: SafeListBinnacleEventsComponent;
  let fixture: ComponentFixture<SafeListBinnacleEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeListBinnacleEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeListBinnacleEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
