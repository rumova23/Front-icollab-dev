import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitsWelcomeComponent } from './bits-welcome.component';

describe('BitsWelcomeComponent', () => {
  let component: BitsWelcomeComponent;
  let fixture: ComponentFixture<BitsWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitsWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitsWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
