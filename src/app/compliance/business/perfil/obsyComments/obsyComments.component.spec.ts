import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsyCommentsComponent } from './obsyComments.component';

describe('ObsyCommentsComponent', () => {
  let component: ObsyCommentsComponent;
  let fixture: ComponentFixture<ObsyCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObsyCommentsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObsyCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
