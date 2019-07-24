import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargePpaComponent } from './chargePpa.component'

describe('ChargePpaComponent', () => {
  let component: ChargePpaComponent;
  let fixture: ComponentFixture<ChargePpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChargePpaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargePpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
