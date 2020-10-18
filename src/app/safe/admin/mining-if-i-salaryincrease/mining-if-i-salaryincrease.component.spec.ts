import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningIFISalaryincreaseComponent } from './mining-if-i-salaryincrease.component';

describe('MiningIFISalaryincreaseComponent', () => {
  let component: MiningIFISalaryincreaseComponent;
  let fixture: ComponentFixture<MiningIFISalaryincreaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningIFISalaryincreaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningIFISalaryincreaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
