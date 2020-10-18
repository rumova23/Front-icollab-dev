import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdaAceptadaComponent } from './mda-aceptada.component';

describe('MdaAceptadaComponent', () => {
  let component: MdaAceptadaComponent;
  let fixture: ComponentFixture<MdaAceptadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdaAceptadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdaAceptadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
