import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramDefinitionComponent } from './add-program-definition.component';

describe('AddProgramDefinitionComponent', () => {
  let component: AddProgramDefinitionComponent;
  let fixture: ComponentFixture<AddProgramDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgramDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
