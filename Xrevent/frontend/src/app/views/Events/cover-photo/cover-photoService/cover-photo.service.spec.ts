import { TestBed } from '@angular/core/testing';

import { CoverPhotoService } from './cover-photo.service';

describe('CoverPhotoService', () => {
  let service: CoverPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoverPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
