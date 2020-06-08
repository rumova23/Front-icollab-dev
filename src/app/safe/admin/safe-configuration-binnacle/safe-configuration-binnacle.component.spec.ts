import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeConfigurationBinnacleComponent } from './safe-configuration-binnacle.component';

describe('SafeConfigurationBinnacleComponent', () => {
  let component: SafeConfigurationBinnacleComponent;
  let fixture: ComponentFixture<SafeConfigurationBinnacleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeConfigurationBinnacleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeConfigurationBinnacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
