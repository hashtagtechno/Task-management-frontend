import { TestBed } from '@angular/core/testing';

import { ScreenShotService } from './screen-shot.service';

describe('ScreenShotService', () => {
  let service: ScreenShotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenShotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
