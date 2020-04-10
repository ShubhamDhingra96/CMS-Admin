import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBingroupSetupComponent } from './add-bingroup-setup.component';

describe('AddBingroupSetupComponent', () => {
  let component: AddBingroupSetupComponent;
  let fixture: ComponentFixture<AddBingroupSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBingroupSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBingroupSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
