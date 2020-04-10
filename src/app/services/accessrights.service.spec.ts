import { TestBed } from '@angular/core/testing';

import { AccessrightsService } from './accessrights.service';

describe('AccessrightsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessrightsService = TestBed.get(AccessrightsService);
    expect(service).toBeTruthy();
  });
});
