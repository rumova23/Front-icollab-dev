import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogGenericEditComponent } from './catalogGenericEdit.component';

describe('CatalogGenericEditComponent', () => {
  let component: CatalogGenericEditComponent;
  let fixture: ComponentFixture<CatalogGenericEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogGenericEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogGenericEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
