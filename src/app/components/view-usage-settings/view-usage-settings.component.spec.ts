import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsageSettingsComponent } from './view-usage-settings.component';

describe('ViewUsageSettingsComponent', () => {
  let component: ViewUsageSettingsComponent;
  let fixture: ComponentFixture<ViewUsageSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUsageSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
