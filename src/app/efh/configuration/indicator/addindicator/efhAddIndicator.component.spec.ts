import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhAddIndicatorComponent } from './efhAddIndicator.component';

describe('EfhAddIndicatorComponent', () => {
  let component: EfhAddIndicatorComponent;
  let fixture: ComponentFixture<EfhAddIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhAddIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhAddIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
