import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDefinitionConfirmationComponent } from './program-definition-confirmation.component';

describe('ProgramDefinitionConfirmationComponent', () => {
  let component: ProgramDefinitionConfirmationComponent;
  let fixture: ComponentFixture<ProgramDefinitionConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramDefinitionConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDefinitionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
