import { TestBed } from '@angular/core/testing';

import { BinSetupService } from './bin-setup.service';

describe('BinSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BinSetupService = TestBed.get(BinSetupService);
    expect(service).toBeTruthy();
  });
});
