import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitsIncidentsEnvironmentalComponent } from './bits-incidents-environmental.component';

describe('BitsIncidentsEnvironmentalComponent', () => {
  let component: BitsIncidentsEnvironmentalComponent;
  let fixture: ComponentFixture<BitsIncidentsEnvironmentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitsIncidentsEnvironmentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitsIncidentsEnvironmentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
