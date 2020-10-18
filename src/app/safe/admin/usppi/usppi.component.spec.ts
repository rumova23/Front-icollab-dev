import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsppiComponent } from './usppi.component';

describe('UsppiComponent', () => {
  let component: UsppiComponent;
  let fixture: ComponentFixture<UsppiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsppiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsppiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
