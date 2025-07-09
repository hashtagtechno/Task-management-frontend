import { TestBed } from '@angular/core/testing';

import { GithubRleaseService } from './github-rlease.service';

describe('GithubRleaseService', () => {
  let service: GithubRleaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubRleaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
