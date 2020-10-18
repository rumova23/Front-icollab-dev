import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsEditComponent } from './plantsEdit.component';

describe('PlantsEditComponent', () => {
  let component: PlantsEditComponent;
  let fixture: ComponentFixture<PlantsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlantsEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
