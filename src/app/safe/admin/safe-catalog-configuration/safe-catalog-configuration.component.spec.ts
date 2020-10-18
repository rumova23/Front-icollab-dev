import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeCatalogConfigurationComponent } from './safe-catalog-configuration.component';

describe('SafeCatalogConfigurationComponent', () => {
  let component: SafeCatalogConfigurationComponent;
  let fixture: ComponentFixture<SafeCatalogConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeCatalogConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeCatalogConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
