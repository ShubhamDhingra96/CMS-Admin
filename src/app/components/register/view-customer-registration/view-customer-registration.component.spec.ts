import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerRegistrationComponent } from './view-customer-registration.component';

describe('ViewCustomerRegistrationComponent', () => {
  let component: ViewCustomerRegistrationComponent;
  let fixture: ComponentFixture<ViewCustomerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCustomerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCustomerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
