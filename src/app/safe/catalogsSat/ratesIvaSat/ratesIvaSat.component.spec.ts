import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesIvaSatComponent } from './ratesIvaSat.component';

describe('RatesIvaSatComponent', () => {
  let component: RatesIvaSatComponent;
  let fixture: ComponentFixture<RatesIvaSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatesIvaSatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesIvaSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
