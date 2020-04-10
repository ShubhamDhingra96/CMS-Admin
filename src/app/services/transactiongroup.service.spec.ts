import { TestBed } from '@angular/core/testing';

import { TransactiongroupService } from './transactiongroup.service';

describe('TransactiongroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactiongroupService = TestBed.get(TransactiongroupService);
    expect(service).toBeTruthy();
  });
});
