import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityProductsSatComponent } from './unityProductsSat.component';

describe('UnityProductsSatComponent', () => {
  let component: UnityProductsSatComponent;
  let fixture: ComponentFixture<UnityProductsSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnityProductsSatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnityProductsSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
