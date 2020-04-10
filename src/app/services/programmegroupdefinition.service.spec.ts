import { TestBed } from '@angular/core/testing';

import { ProgrammedefinitionService } from './programmegroupdefination.service';

describe('ProgrammedefinitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgrammedefinitionService = TestBed.get(ProgrammedefinitionService);
    expect(service).toBeTruthy();
  });
});
