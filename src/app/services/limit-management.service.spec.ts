import { TestBed } from '@angular/core/testing';

import { LimitManagementService } from './limit-management.service';

describe('LimitManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LimitManagementService = TestBed.get(LimitManagementService);
    expect(service).toBeTruthy();
  });
});
