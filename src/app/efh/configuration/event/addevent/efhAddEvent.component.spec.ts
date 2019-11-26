import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhAddEventComponent } from './efhAddEvent.component';

describe('EfhAddEventComponent', () => {
  let component: EfhAddEventComponent;
  let fixture: ComponentFixture<EfhAddEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhAddEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
