import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeppaSupervisionStationComponent } from './safeppa-supervision-station.component';

describe('SafeppaSupervisionStationComponent', () => {
  let component: SafeppaSupervisionStationComponent;
  let fixture: ComponentFixture<SafeppaSupervisionStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeppaSupervisionStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeppaSupervisionStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
