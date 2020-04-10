import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAuthOrderSettingComponent } from './view-auth-order-setting.component';

describe('ViewAuthOrderSettingComponent', () => {
  let component: ViewAuthOrderSettingComponent;
  let fixture: ComponentFixture<ViewAuthOrderSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAuthOrderSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAuthOrderSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
