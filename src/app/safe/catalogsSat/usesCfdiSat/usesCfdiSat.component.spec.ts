import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsesCfdiSatComponent } from './usesCfdiSat.component';

describe('UsesCfdiSatComponent', () => {
  let component: UsesCfdiSatComponent;
  let fixture: ComponentFixture<UsesCfdiSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsesCfdiSatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsesCfdiSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
