import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMerchantCategoryComponent } from './view-merchant-category.component';

describe('ViewMerchantCategoryComponent', () => {
  let component: ViewMerchantCategoryComponent;
  let fixture: ComponentFixture<ViewMerchantCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMerchantCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMerchantCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
