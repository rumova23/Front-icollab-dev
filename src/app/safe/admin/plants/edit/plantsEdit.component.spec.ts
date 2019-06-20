import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlantsComponent } from './plantsEdit.component';

describe('EditPlantsComponent', () => {
  let component: EditPlantsComponent;
  let fixture: ComponentFixture<EditPlantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPlantsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
