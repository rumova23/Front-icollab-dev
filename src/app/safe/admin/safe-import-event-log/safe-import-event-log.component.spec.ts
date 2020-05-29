import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeImportEventLogComponent } from './safe-import-event-log.component';

describe('SafeImportEventLogComponent', () => {
  let component: SafeImportEventLogComponent;
  let fixture: ComponentFixture<SafeImportEventLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeImportEventLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeImportEventLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
