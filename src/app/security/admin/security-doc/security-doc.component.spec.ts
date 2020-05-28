import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityDocComponent } from './security-doc.component';

describe('SecurityDocComponent', () => {
  let component: SecurityDocComponent;
  let fixture: ComponentFixture<SecurityDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
