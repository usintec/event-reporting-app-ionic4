import { TestBed } from '@angular/core/testing';

import { AuthMonithoringService } from './auth-monithoring.service';

describe('AuthMonithoringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthMonithoringService = TestBed.get(AuthMonithoringService);
    expect(service).toBeTruthy();
  });
});
