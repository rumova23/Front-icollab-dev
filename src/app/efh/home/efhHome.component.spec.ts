import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhHomeComponent } from './efhHome.component';

describe('EfhHomeComponent', () => {
  let component: EfhHomeComponent;
  let fixture: ComponentFixture<EfhHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
