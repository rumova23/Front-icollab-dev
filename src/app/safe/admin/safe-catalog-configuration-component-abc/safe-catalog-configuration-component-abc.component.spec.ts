import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeCatalogConfigurationComponentAbcComponent } from './safe-catalog-configuration-component-abc.component';

describe('SafeCatalogConfigurationComponentAbcComponent', () => {
  let component: SafeCatalogConfigurationComponentAbcComponent;
  let fixture: ComponentFixture<SafeCatalogConfigurationComponentAbcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeCatalogConfigurationComponentAbcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeCatalogConfigurationComponentAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
