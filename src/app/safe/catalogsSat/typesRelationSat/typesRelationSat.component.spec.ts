import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesRelationSatComponent } from './typesRelationSat.component';

describe('TypesRelationSatComponent', () => {
  let component: TypesRelationSatComponent;
  let fixture: ComponentFixture<TypesRelationSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TypesRelationSatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesRelationSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
