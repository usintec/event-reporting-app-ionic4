import { TestBed } from '@angular/core/testing';

import { EventImageService } from './event-image.service';

describe('EventImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventImageService = TestBed.get(EventImageService);
    expect(service).toBeTruthy();
  });
});
