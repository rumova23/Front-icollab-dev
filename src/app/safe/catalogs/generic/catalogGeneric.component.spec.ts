import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogGenericComponent } from './catalogGeneric.component';

describe('CatalogGenericComponent', () => {
  let component: CatalogGenericComponent;
  let fixture: ComponentFixture<CatalogGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogGenericComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
