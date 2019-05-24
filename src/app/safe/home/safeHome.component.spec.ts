import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeHomeComponent } from './safeHome.component';

describe('SafeHomeComponent', () => {
  let component: SafeHomeComponent;
  let fixture: ComponentFixture<SafeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
