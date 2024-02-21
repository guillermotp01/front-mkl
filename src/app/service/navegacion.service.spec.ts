import { TestBed } from '@angular/core/testing';

import { NavegacionService } from './navegacion.service';

describe('NavegacionService', () => {
  let service: NavegacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavegacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
