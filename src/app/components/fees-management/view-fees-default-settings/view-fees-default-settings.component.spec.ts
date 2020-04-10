import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeesDefaultSettingsComponent } from './view-fees-default-settings.component';

describe('ViewFeesDefaultSettingsComponent', () => {
  let component: ViewFeesDefaultSettingsComponent;
  let fixture: ComponentFixture<ViewFeesDefaultSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFeesDefaultSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeesDefaultSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
