import { TestBed } from '@angular/core/testing';

import { SupervisionService } from './supervision.service';

describe('SupervisionService', () => {
  let service: SupervisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupervisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
