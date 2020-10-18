import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCatalogsComponent } from './generic-catalogs.component';

describe('GenericCatalogsComponent', () => {
  let component: GenericCatalogsComponent;
  let fixture: ComponentFixture<GenericCatalogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericCatalogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericCatalogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
