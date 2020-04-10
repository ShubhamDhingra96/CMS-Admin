import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeesSpecificSettingsComponent } from './view-fees-specific-settings.component';

describe('ViewFeesSpecificSettingsComponent', () => {
  let component: ViewFeesSpecificSettingsComponent;
  let fixture: ComponentFixture<ViewFeesSpecificSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFeesSpecificSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeesSpecificSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
