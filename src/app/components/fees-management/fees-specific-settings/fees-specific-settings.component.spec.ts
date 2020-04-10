import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesSpecificSettingsComponent } from './fees-specific-settings.component';

describe('FeesSpecificSettingsComponent', () => {
  let component: FeesSpecificSettingsComponent;
  let fixture: ComponentFixture<FeesSpecificSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesSpecificSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesSpecificSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
