import { TestBed } from '@angular/core/testing';

import { UsagesService } from './usages.service';

describe('UsagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsagesService = TestBed.get(UsagesService);
    expect(service).toBeTruthy();
  });
});
