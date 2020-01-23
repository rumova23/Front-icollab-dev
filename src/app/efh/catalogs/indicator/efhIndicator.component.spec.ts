import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhIndicatorComponent } from './efhIndicator.component';

describe('EfhIndicatorComponent', () => {
  let component: EfhIndicatorComponent;
  let fixture: ComponentFixture<EfhIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
