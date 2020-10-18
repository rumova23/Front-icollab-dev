import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningIFCFuelComponent } from './mining-if-c-fuel.component';

describe('MiningIFCFuelComponent', () => {
  let component: MiningIFCFuelComponent;
  let fixture: ComponentFixture<MiningIFCFuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningIFCFuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningIFCFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
