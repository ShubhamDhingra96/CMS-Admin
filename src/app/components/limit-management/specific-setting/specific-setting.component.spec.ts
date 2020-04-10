import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificSettingComponent } from './specific-setting.component';

describe('SpecificSettingComponent', () => {
  let component: SpecificSettingComponent;
  let fixture: ComponentFixture<SpecificSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
