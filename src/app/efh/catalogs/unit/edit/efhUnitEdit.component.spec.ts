import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhUnitEditComponent } from './efhUnitEdit.component';

describe('EfhUnitEditComponent', () => {
  let component: EfhUnitEditComponent;
  let fixture: ComponentFixture<EfhUnitEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhUnitEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhUnitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
