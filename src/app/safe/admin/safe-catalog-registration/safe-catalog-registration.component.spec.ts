import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeCatalogRegistrationComponent } from './safe-catalog-registration.component';

describe('SafeCatalogRegistrationComponent', () => {
  let component: SafeCatalogRegistrationComponent;
  let fixture: ComponentFixture<SafeCatalogRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeCatalogRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeCatalogRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
