import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductTypeDefinitionComponent } from './add-product-type-definition.component';

describe('AddProductTypeDefinitionComponent', () => {
  let component: AddProductTypeDefinitionComponent;
  let fixture: ComponentFixture<AddProductTypeDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductTypeDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductTypeDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
