import { TestBed } from '@angular/core/testing';

import { EventPhotoService } from './event-photo.service';

describe('EventPhotoService', () => {
  let service: EventPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
