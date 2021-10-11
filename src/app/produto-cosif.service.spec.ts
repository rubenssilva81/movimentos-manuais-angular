import { TestBed } from '@angular/core/testing';

import { ProdutoCosifService } from './produto-cosif.service';

describe('ProdutoCosifService', () => {
  let service: ProdutoCosifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoCosifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
