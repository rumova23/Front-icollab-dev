import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuecdEditComponent } from './fuecdEdit.component';

describe('FuecdEditComponent', () => {
  let component: FuecdEditComponent;
  let fixture: ComponentFixture<FuecdEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FuecdEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuecdEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
