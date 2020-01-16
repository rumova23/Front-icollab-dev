import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalAcceptedComponent } from './proposalAccepted.component';

describe('ProposalAcceptedComponent', () => {
  let component: ProposalAcceptedComponent;
  let fixture: ComponentFixture<ProposalAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
