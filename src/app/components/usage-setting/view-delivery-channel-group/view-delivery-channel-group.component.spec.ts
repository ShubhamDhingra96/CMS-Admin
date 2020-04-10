import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeliveryChannelGroupComponent } from './view-delivery-channel-group.component';

describe('ViewDeliveryChannelGroupComponent', () => {
  let component: ViewDeliveryChannelGroupComponent;
  let fixture: ComponentFixture<ViewDeliveryChannelGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDeliveryChannelGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeliveryChannelGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
