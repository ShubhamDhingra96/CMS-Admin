import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignProductComponent } from './view-assign-product.component';

describe('ViewAssignProductComponent', () => {
  let component: ViewAssignProductComponent;
  let fixture: ComponentFixture<ViewAssignProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAssignProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
