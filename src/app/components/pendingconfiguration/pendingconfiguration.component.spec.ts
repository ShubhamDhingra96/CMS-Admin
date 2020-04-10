import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingconfigurationComponent } from './pendingconfiguration.component';

describe('PendingconfigurationComponent', () => {
  let component: PendingconfigurationComponent;
  let fixture: ComponentFixture<PendingconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
