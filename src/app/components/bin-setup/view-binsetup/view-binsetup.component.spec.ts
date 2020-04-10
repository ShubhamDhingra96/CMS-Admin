import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBinsetupComponent } from './view-binsetup.component';

describe('ViewBinsetupComponent', () => {
  let component: ViewBinsetupComponent;
  let fixture: ComponentFixture<ViewBinsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBinsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBinsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
