import { TestBed } from '@angular/core/testing';

import { DrinksDataService } from './drinks-data.service';

describe('DrinksDataService', () => {
  let service: DrinksDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrinksDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
