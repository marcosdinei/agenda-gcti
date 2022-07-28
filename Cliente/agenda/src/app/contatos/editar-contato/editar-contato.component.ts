import { ModalService } from './../../componentes/modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Enderecos } from '../enderecos/endereco';
import { EnderecosService } from '../enderecos/enderecos.service';
import { TelefoneExisteService } from '../telefone-existe.service';
import { ContatosService } from './../contatos.service';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent implements OnInit {

  contatoForm!: FormGroup;
  tipoForm: string = 'Editar contato';
  contato_id!: number;
  enderecos: Enderecos = [];
  erroEndereco: boolean = false; //RESOLVER MSG ERRO ENDEREÇO

  constructor(
    private formBuilder: FormBuilder,
    private contatosService: ContatosService,
    private enderecosService: EnderecosService,
    private telefoneExisteService: TelefoneExisteService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.contato_id = this.activatedRoute.snapshot.params['contato_id'];

    this.contatosService.detalheContato(this.contato_id).subscribe((contato) => {
      this.contatoForm = this.formBuilder.group({
        nome: [contato.nome, [Validators.required]],
        telefone: [contato.telefone, [Validators.required], [this.telefoneExisteService.telefoneExiste()]], //RESOLVER TELEFONE
        email: [contato.email, [Validators.required, Validators.email]],
        whatsapp: [contato.whatsapp]
      });
    });

    this.enderecosService.eventEnderecos.subscribe(
      (event) => {
        this.enderecos = event;
      }
    );

    this.enderecosService.eventErroEndereco.subscribe(
      (event) => {
        this.erroEndereco = event;
      }
    );
  }

  editaContato() {
    if (this.contatoForm.valid) {
      if (this.enderecos.length) {
        const novoContato = this.contatoForm.getRawValue();
        this.contatosService.editaContato(this.contato_id, novoContato).subscribe(() => {
          this.router.navigate(['contatos']);
        });
      } else {
        this.erroEndereco = true;
      }
    } else {
      this.modalService.aparecer();
    }
  }

  excluiContato() {
    this.contatosService.excluiContato(this.contato_id).subscribe(() => {
      this.router.navigate(['contatos']);
    });
  }

}
