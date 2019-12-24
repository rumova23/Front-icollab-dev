import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhCommentsComponent } from './efh-comments.component';

describe('EfhCommentsComponent', () => {
  let component: EfhCommentsComponent;
  let fixture: ComponentFixture<EfhCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
