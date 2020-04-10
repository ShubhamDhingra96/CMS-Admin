import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProgramDefinitionComponent } from './view-program-definition.component';

describe('ViewProgramDefinitionComponent', () => {
  let component: ViewProgramDefinitionComponent;
  let fixture: ComponentFixture<ViewProgramDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProgramDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProgramDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
