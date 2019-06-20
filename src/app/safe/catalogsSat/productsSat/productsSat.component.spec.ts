import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSatComponent } from './productsSat.component';

describe('ProductsSatComponent', () => {
  let component: ProductsSatComponent;
  let fixture: ComponentFixture<ProductsSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsSatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
