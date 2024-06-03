import { TestBed } from '@angular/core/testing';

import { OdbcService } from './odbc.service';

describe('OdbcService', () => {
  let service: OdbcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdbcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
