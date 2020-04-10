import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquiringNetworkComponent } from './acquiring-network.component';

describe('AcquiringNetworkComponent', () => {
  let component: AcquiringNetworkComponent;
  let fixture: ComponentFixture<AcquiringNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquiringNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquiringNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
