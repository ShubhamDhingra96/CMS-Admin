import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductTypeDefinitionComponent } from './view-product-type-definition.component';

describe('ViewProductTypeDefinitionComponent', () => {
  let component: ViewProductTypeDefinitionComponent;
  let fixture: ComponentFixture<ViewProductTypeDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductTypeDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductTypeDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
