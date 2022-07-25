import { TestBed } from '@angular/core/testing';

import { PropDataService } from './prop-data.service';

describe('PropDataService', () => {
  let service: PropDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
