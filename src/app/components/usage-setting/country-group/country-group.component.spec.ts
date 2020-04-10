import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryGroupComponent } from './country-group.component';

describe('CountryGroupComponent', () => {
  let component: CountryGroupComponent;
  let fixture: ComponentFixture<CountryGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
