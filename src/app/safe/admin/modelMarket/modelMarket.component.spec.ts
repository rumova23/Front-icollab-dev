import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMarketComponent } from './modelMarket.component'

describe('ModelMarketComponent', () => {
  let component: ModelMarketComponent;
  let fixture: ComponentFixture<ModelMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelMarketComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
