import { TestBed } from '@angular/core/testing';

import { ProductDefinationService } from './productdefination.service';

describe('ProgrammedefinitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductDefinationService = TestBed.get(ProductDefinationService);
    expect(service).toBeTruthy();
  });
});
