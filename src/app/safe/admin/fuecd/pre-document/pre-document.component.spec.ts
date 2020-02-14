import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDocumentComponent } from './pre-document.component';

describe('PreDocumentComponent', () => {
  let component: PreDocumentComponent;
  let fixture: ComponentFixture<PreDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
