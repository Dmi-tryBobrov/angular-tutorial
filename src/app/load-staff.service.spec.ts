import { TestBed } from '@angular/core/testing';

import { LoadStaffService } from './load-staff.service';

describe('LoadStaffService', () => {
  let service: LoadStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
