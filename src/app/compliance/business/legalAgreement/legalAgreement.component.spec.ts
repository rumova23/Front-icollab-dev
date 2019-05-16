import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CumplimientoLegalComponent } from './cumplimiento-legal.component';

describe('CumplimientoLegalComponent', () => {
  let component: CumplimientoLegalComponent;
  let fixture: ComponentFixture<CumplimientoLegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CumplimientoLegalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CumplimientoLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
