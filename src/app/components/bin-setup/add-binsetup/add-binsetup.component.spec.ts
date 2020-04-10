import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBinsetupComponent } from './add-binsetup.component';

describe('AddBinsetupComponent', () => {
  let component: AddBinsetupComponent;
  let fixture: ComponentFixture<AddBinsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBinsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBinsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
