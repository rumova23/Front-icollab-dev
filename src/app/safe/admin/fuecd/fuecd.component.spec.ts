import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuecdComponent } from './fuecd.component';

describe('FuecdComponent', () => {
  let component: FuecdComponent;
  let fixture: ComponentFixture<FuecdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FuecdComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuecdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
