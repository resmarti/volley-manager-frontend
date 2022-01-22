import { TestBed } from '@angular/core/testing';

import { RefreshContactPersonsService } from './refresh-contact-persons.service';

describe('RefreshContactPersonsService', () => {
  let service: RefreshContactPersonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshContactPersonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
