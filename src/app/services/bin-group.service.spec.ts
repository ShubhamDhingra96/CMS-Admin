import { TestBed } from '@angular/core/testing';

import { BinGroupService } from './bin-group.service';

describe('BinGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BinGroupService = TestBed.get(BinGroupService);
    expect(service).toBeTruthy();
  });
});
