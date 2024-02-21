import { TestBed } from '@angular/core/testing';

import { ListarVentasService } from './listar-ventas.service';

describe('ListarVentasService', () => {
  let service: ListarVentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarVentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
