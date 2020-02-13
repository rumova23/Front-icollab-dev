import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFacturacionComponent } from './control-facturacion.component';

describe('ControlFacturacionComponent', () => {
  let component: ControlFacturacionComponent;
  let fixture: ComponentFixture<ControlFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
