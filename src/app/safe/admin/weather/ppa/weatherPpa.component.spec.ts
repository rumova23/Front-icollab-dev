import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPpaComponent } from './weatherPpa.component'

describe('WeatherPpaComponent', () => {
  let component: WeatherPpaComponent;
  let fixture: ComponentFixture<WeatherPpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherPpaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherPpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
