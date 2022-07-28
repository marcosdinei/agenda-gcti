import { TestBed } from '@angular/core/testing';

import { ModalEnderecoService } from './modal-endereco.service';

describe('ModalEnderecoService', () => {
  let service: ModalEnderecoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalEnderecoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
