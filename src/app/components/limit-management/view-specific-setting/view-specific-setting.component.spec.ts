import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificSettingComponent } from './view-specific-setting.component';

describe('ViewSpecificSettingComponent', () => {
  let component: ViewSpecificSettingComponent;
  let fixture: ComponentFixture<ViewSpecificSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSpecificSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecificSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
