import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignEntityRightComponent } from './view-assign-entity-right.component';

describe('ViewAssignEntityRightComponent', () => {
  let component: ViewAssignEntityRightComponent;
  let fixture: ComponentFixture<ViewAssignEntityRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAssignEntityRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignEntityRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
