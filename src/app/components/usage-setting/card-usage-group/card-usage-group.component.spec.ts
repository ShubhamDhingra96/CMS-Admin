import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUsageGroupComponent } from './card-usage-group.component';

describe('CardUsageGroupComponent', () => {
  let component: CardUsageGroupComponent;
  let fixture: ComponentFixture<CardUsageGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardUsageGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUsageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
