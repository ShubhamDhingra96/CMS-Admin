import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlasticProductSetupComponent } from './add-plastic-product-setup.component';

describe('AddPlasticProductSetupComponent', () => {
  let component: AddPlasticProductSetupComponent;
  let fixture: ComponentFixture<AddPlasticProductSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlasticProductSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlasticProductSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
