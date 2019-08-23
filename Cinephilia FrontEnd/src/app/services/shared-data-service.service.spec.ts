import { TestBed } from '@angular/core/testing';

import { SharedDataServiceService } from './shared-data-service.service';

describe('SharedDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedDataServiceService = TestBed.get(SharedDataServiceService);
    expect(service).toBeTruthy();
  });
});
