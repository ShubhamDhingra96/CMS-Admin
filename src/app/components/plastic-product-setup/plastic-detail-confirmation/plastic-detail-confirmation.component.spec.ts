import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlasticDetailConfirmationComponent } from './plastic-detail-confirmation.component';

describe('PlasticDetailConfirmationComponent', () => {
  let component: PlasticDetailConfirmationComponent;
  let fixture: ComponentFixture<PlasticDetailConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlasticDetailConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlasticDetailConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
