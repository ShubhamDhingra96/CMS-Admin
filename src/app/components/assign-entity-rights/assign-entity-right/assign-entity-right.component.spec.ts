import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEntityRightComponent } from './assign-entity-right.component';

describe('AssignEntityRightComponent', () => {
  let component: AssignEntityRightComponent;
  let fixture: ComponentFixture<AssignEntityRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignEntityRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignEntityRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
