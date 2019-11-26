import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhEditEventComponent } from './efhEditEvent.component';

describe('EfhEditEventComponent', () => {
  let component: EfhEditEventComponent;
  let fixture: ComponentFixture<EfhEditEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhEditEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhEditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
