import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhEventTypeComponent } from './efhEventType.component';

describe('EfhEventTypeComponent', () => {
  let component: EfhEventTypeComponent;
  let fixture: ComponentFixture<EfhEventTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhEventTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhEventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
