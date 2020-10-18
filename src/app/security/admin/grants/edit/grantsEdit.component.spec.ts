import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantsEditComponent } from './grantsEdit.component';

describe('GrantsEditComponent', () => {
  let component: GrantsEditComponent;
  let fixture: ComponentFixture<GrantsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GrantsEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
