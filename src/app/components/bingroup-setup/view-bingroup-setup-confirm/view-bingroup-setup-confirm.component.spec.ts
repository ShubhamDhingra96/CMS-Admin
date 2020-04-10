import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBingroupSetupConfirmComponent } from './view-bingroup-setup-confirm.component';

describe('ViewBingroupSetupConfirmComponent', () => {
  let component: ViewBingroupSetupConfirmComponent;
  let fixture: ComponentFixture<ViewBingroupSetupConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBingroupSetupConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBingroupSetupConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
