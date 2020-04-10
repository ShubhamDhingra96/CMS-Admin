import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChannelGroupComponent } from './delivery-channel-group.component';

describe('DeliveryChannelGroupComponent', () => {
  let component: DeliveryChannelGroupComponent;
  let fixture: ComponentFixture<DeliveryChannelGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryChannelGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryChannelGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
