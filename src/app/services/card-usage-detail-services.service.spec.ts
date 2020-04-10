import { TestBed } from '@angular/core/testing';

import { CardUsageDetailServicesService } from './card-usage-detail-services.service';

describe('CardUsageDetailServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardUsageDetailServicesService = TestBed.get(CardUsageDetailServicesService);
    expect(service).toBeTruthy();
  });
});
