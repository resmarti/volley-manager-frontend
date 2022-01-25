import { TestBed } from '@angular/core/testing';

import { TeammembersService } from './teammembers.service';

describe('TeammembersService', () => {
  let service: TeammembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeammembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
