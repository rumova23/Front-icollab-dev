import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalRegimensSatComponent } from './fiscalRegimensSat.component';

describe('FiscalRegimensSatComponent', () => {
  let component: FiscalRegimensSatComponent;
  let fixture: ComponentFixture<FiscalRegimensSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiscalRegimensSatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalRegimensSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
