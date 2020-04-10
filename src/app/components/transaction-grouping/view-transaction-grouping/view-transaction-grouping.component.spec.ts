import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransactionGroupingComponent } from './view-transaction-grouping.component';

describe('ViewTransactionGroupingComponent', () => {
  let component: ViewTransactionGroupingComponent;
  let fixture: ComponentFixture<ViewTransactionGroupingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTransactionGroupingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransactionGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
