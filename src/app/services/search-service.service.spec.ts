import { TestBed } from '@angular/core/testing';

import { SearchTearmService } from './search-service.service';

describe('SearchTearmService', () => {
  let service: SearchTearmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTearmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
