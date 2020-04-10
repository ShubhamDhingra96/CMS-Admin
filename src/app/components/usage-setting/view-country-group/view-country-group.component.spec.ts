import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCountryGroupComponent } from './view-country-group.component';

describe('ViewCountryGroupComponent', () => {
  let component: ViewCountryGroupComponent;
  let fixture: ComponentFixture<ViewCountryGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCountryGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCountryGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
