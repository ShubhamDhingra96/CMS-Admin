import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesDefaultSettingsComponent } from './fees-default-settings.component';

describe('FeesDefaultSettingsComponent', () => {
  let component: FeesDefaultSettingsComponent;
  let fixture: ComponentFixture<FeesDefaultSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesDefaultSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesDefaultSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
