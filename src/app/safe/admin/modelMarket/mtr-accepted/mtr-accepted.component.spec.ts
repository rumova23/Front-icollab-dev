import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtrAcceptedComponent } from './mtr-accepted.component';

describe('MtrAcceptedComponent', () => {
  let component: MtrAcceptedComponent;
  let fixture: ComponentFixture<MtrAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtrAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtrAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
