import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientsComponent } from './editClients.component';

describe('EditClientsComponent', () => {
  let component: EditClientsComponent;
  let fixture: ComponentFixture<EditClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditClientsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
