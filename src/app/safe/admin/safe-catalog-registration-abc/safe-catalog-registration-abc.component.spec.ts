import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeCatalogRegistrationAbcComponent } from './safe-catalog-registration-abc.component';

describe('SafeCatalogRegistrationAbcComponent', () => {
  let component: SafeCatalogRegistrationAbcComponent;
  let fixture: ComponentFixture<SafeCatalogRegistrationAbcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeCatalogRegistrationAbcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeCatalogRegistrationAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
