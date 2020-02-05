import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMtrPlantComponent } from './edit-mtr-plant.component';

describe('EditMtrPlantComponent', () => {
  let component: EditMtrPlantComponent;
  let fixture: ComponentFixture<EditMtrPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMtrPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMtrPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
