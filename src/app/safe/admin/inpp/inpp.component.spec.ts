import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InppComponent } from './inpp.component';

describe('InppComponent', () => {
  let component: InppComponent;
  let fixture: ComponentFixture<InppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
