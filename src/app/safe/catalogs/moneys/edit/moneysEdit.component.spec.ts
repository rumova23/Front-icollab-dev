import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneysEditComponent } from './moneysEdit.component';

describe('MoneysEditComponent', () => {
  let component: MoneysEditComponent;
  let fixture: ComponentFixture<MoneysEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoneysEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneysEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
