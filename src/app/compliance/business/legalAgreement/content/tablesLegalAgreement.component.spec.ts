import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesLegalAgreementComponent } from './tablesLegalAgreement.component';

describe('TablesLegalAgreementComponent', () => {
  let component: TablesLegalAgreementComponent;
  let fixture: ComponentFixture<TablesLegalAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesLegalAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesLegalAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
