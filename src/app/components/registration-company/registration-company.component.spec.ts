import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCompanyComponent } from './registration-company.component';

describe('RegistrationCompanyComponent', () => {
  let component: RegistrationCompanyComponent;
  let fixture: ComponentFixture<RegistrationCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
