import { TestBed } from '@angular/core/testing';

import { RealizarVentaService } from './realizar-venta.service';

describe('RealizarVentaService', () => {
  let service: RealizarVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealizarVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
