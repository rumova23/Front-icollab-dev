import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtrCenaceComponent } from './mtr-cenace.component';

describe('MtrCenaceComponent', () => {
  let component: MtrCenaceComponent;
  let fixture: ComponentFixture<MtrCenaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtrCenaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtrCenaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
