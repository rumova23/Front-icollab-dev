import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhAnaliticsEventComponent } from './efhAnaliticsEvent.component';

describe('EfhAnaliticsEventComponent', () => {
  let component: EfhAnaliticsEventComponent;
  let fixture: ComponentFixture<EfhAnaliticsEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhAnaliticsEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhAnaliticsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
