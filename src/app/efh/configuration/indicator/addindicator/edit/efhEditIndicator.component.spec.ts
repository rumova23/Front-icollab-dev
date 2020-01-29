import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhEditIndicatorComponent } from './efhEditIndicator.component';

describe('EfhEditIndicatorComponent', () => {
  let component: EfhEditIndicatorComponent;
  let fixture: ComponentFixture<EfhEditIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhEditIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhEditIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
