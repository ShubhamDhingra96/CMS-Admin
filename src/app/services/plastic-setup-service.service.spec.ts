import { TestBed } from '@angular/core/testing';

import { PlasticSetupServiceService } from './plastic-setup-service.service';

describe('PlasticSetupServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlasticSetupServiceService = TestBed.get(PlasticSetupServiceService);
    expect(service).toBeTruthy();
  });
});
