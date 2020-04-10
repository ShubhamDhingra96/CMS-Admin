import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBingroupSetupComponent } from './modify-bingroup-setup.component';

describe('ModifyBingroupSetupComponent', () => {
  let component: ModifyBingroupSetupComponent;
  let fixture: ComponentFixture<ModifyBingroupSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyBingroupSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBingroupSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
