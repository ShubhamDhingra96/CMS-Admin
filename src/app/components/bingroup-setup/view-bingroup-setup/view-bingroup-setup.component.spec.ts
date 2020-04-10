import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBingroupSetupComponent } from './view-bingroup-setup.component';

describe('ViewBingroupSetupComponent', () => {
  let component: ViewBingroupSetupComponent;
  let fixture: ComponentFixture<ViewBingroupSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBingroupSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBingroupSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
