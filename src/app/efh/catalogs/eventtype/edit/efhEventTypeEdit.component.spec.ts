import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhEventTypeEditComponent } from './efhEventTypeEdit.component';

describe('EfhEventTypeEditComponent', () => {
  let component: EfhEventTypeEditComponent;
  let fixture: ComponentFixture<EfhEventTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhEventTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhEventTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
