import { TestBed } from '@angular/core/testing';

import { TelefoneExisteService } from './telefone-existe.service';

describe('TelefoneExisteService', () => {
  let service: TelefoneExisteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelefoneExisteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
