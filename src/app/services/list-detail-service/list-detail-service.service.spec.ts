import { TestBed, inject } from '@angular/core/testing';

import { ListDetailServiceService } from './list-detail-service.service';

describe('ListDetailServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListDetailServiceService]
    });
  });

  it('should be created', inject([ListDetailServiceService], (service: ListDetailServiceService) => {
    expect(service).toBeTruthy();
  }));
});
