import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAcquiringNetworkComponent } from './view-acquiring-network.component';

describe('ViewAcquiringNetworkComponent', () => {
  let component: ViewAcquiringNetworkComponent;
  let fixture: ComponentFixture<ViewAcquiringNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAcquiringNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAcquiringNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
