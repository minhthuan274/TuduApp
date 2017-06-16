import { TestBed, inject } from '@angular/core/testing';

import { AdminGuardService } from './admin-guard.service';

describe('AdminGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuardService]
    });
  });

  it('should ...', inject([AdminGuardService], (service: AdminGuardService) => {
    expect(service).toBeTruthy();
  }));
});
