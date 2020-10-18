import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitsIncidentsEnvironmentalABCComponent } from './bits-incidents-environmental-abc.component';

describe('BitsIncidentsEnvironmentalABCComponent', () => {
  let component: BitsIncidentsEnvironmentalABCComponent;
  let fixture: ComponentFixture<BitsIncidentsEnvironmentalABCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitsIncidentsEnvironmentalABCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitsIncidentsEnvironmentalABCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
