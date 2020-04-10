import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateEntityComponent } from './corporate-entity.component';

describe('CorporateEntityComponent', () => {
  let component: CorporateEntityComponent;
  let fixture: ComponentFixture<CorporateEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
