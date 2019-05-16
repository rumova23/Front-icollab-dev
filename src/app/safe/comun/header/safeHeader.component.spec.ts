import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeHeaderComponent } from './safeHeader.component';

describe('SafeHeaderComponent', () => {
  let component: SafeHeaderComponent;
  let fixture: ComponentFixture<SafeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SafeHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
