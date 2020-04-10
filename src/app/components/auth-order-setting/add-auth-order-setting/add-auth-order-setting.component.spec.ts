import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuthOrderSettingComponent } from './add-auth-order-setting.component';

describe('AddAuthOrderSettingComponent', () => {
  let component: AddAuthOrderSettingComponent;
  let fixture: ComponentFixture<AddAuthOrderSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAuthOrderSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuthOrderSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
