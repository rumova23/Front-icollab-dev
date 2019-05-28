import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmlComponent } from './pml.component';

describe('PmlComponent', () => {
  let component: PmlComponent;
  let fixture: ComponentFixture<PmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
