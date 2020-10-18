import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhIndicatorEditComponent } from './efhIndicatorEdit.component';

describe('EfhIndicatorEditComponent', () => {
  let component: EfhIndicatorEditComponent;
  let fixture: ComponentFixture<EfhIndicatorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhIndicatorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhIndicatorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
