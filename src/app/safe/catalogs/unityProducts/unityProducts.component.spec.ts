import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityProductsComponent } from './unityProducts.component';

describe('UnityProductsComponent', () => {
  let component: UnityProductsComponent;
  let fixture: ComponentFixture<UnityProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnityProductsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnityProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
