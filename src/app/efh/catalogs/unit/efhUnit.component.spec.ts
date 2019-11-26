import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfhUnitComponent } from './efhUnit.component';

describe('EfhUnitComponent', () => {
  let component: EfhUnitComponent;
  let fixture: ComponentFixture<EfhUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfhUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfhUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
