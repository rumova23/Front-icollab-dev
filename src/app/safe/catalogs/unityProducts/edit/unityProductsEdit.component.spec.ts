import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityProductsEditComponent } from './unityProductsEdit.component';

describe('UnityProductsEditComponent', () => {
  let component: UnityProductsEditComponent;
  let fixture: ComponentFixture<UnityProductsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnityProductsEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnityProductsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
