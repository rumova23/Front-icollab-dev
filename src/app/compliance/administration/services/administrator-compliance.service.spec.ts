import { TestBed } from '@angular/core/testing';

import { AdministratorComplianceService } from './administrator-compliance.service';

describe('AdministratorComplianceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdministratorComplianceService = TestBed.get(AdministratorComplianceService);
    expect(service).toBeTruthy();
  });
});
