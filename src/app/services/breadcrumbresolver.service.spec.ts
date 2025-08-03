import { TestBed } from '@angular/core/testing';

import { BreadcrumbresolverService } from './breadcrumbresolver.service';

describe('BreadcrumbresolverService', () => {
  let service: BreadcrumbresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
