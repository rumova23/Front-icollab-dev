import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeConfigurationBinnacleEditComponent } from './safe-configuration-binnacle-edit.component';

describe('SafeConfigurationBinnacleEditComponent', () => {
  let component: SafeConfigurationBinnacleEditComponent;
  let fixture: ComponentFixture<SafeConfigurationBinnacleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeConfigurationBinnacleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeConfigurationBinnacleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
