import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';

import { ContatosService } from './contatos.service';

@Injectable({
  providedIn: 'root'
})
export class TelefoneExisteService {

  constructor(private contatosService: ContatosService) { }

  telefoneExiste() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((telefone) =>
          this.contatosService.verificaTelefone(telefone)
        ),
        map((telefoneExiste) => (telefoneExiste ? {telefone:true} : null)),
        first()
      );
    }
  }

}
