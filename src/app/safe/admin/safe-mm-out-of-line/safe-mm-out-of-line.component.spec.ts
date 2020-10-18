import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeMmOutOfLineComponent } from './safe-mm-out-of-line.component';

describe('SafeMmOutOfLineComponent', () => {
  let component: SafeMmOutOfLineComponent;
  let fixture: ComponentFixture<SafeMmOutOfLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeMmOutOfLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeMmOutOfLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
