import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningIFCWaterComponent } from './mining-if-c-water.component';

describe('MiningIFCWaterComponent', () => {
  let component: MiningIFCWaterComponent;
  let fixture: ComponentFixture<MiningIFCWaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningIFCWaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningIFCWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
