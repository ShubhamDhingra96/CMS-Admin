import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCardUsageGroupComponent } from './view-card-usage-group.component';

describe('ViewCardUsageGroupComponent', () => {
  let component: ViewCardUsageGroupComponent;
  let fixture: ComponentFixture<ViewCardUsageGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCardUsageGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCardUsageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
