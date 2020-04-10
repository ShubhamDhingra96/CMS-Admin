import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDefaultSettingsComponent } from './view-default-settings.component';

describe('ViewDefaultSettingsComponent', () => {
  let component: ViewDefaultSettingsComponent;
  let fixture: ComponentFixture<ViewDefaultSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDefaultSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDefaultSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
