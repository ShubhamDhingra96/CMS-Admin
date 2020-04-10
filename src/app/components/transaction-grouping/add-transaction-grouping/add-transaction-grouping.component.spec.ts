import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionGroupingComponent } from './add-transaction-grouping.component';

describe('AddTransactionGroupingComponent', () => {
  let component: AddTransactionGroupingComponent;
  let fixture: ComponentFixture<AddTransactionGroupingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransactionGroupingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
