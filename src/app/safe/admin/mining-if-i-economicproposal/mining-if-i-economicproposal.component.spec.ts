import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningIFIEconomicproposalComponent } from './mining-if-i-economicproposal.component';

describe('MiningIFIEconomicproposalComponent', () => {
  let component: MiningIFIEconomicproposalComponent;
  let fixture: ComponentFixture<MiningIFIEconomicproposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningIFIEconomicproposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningIFIEconomicproposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
