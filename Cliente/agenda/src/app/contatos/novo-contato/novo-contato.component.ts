import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ContatosService } from '../contatos.service';
import { Enderecos } from '../enderecos/endereco';
import { TelefoneExisteService } from '../telefone-existe.service';
import { AgendaService } from './../../agenda/agenda.service';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { ModalService } from './../../componentes/modal/modal.service';
import { EnderecosService } from './../enderecos/enderecos.service';

@Component({
  selector: 'app-novo-contato',
  templateUrl: './novo-contato.component.html',
  styleUrls: ['./novo-contato.component.css']
})
export class NovoContatoComponent implements OnInit {

  contatoForm!: FormGroup;
  tipoForm: string = 'Novo contato';
  agenda_id!: number;
  enderecos: Enderecos = [];
  erroEndereco: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private telefoneExisteService: TelefoneExisteService,
    private agendaService: AgendaService,
    private contatosService: ContatosService,
    private enderecosService: EnderecosService,
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioService.retornaUsuario().subscribe(
      (usuario) => {
        const usuario_id = usuario.id ?? 0;
        this.agendaService.retornaIdAgenda(usuario_id).subscribe(
          (id) => {
            this.agenda_id = id ?? 0;
          }
        )
      }
    );

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

    this.contatoForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required], [this.telefoneExisteService.telefoneExiste()]],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: [true]
    });
  }

  cadastraContato() {
    if (this.contatoForm.valid) {
      if (this.enderecos.length) {
        const novoContato = this.contatoForm.getRawValue();
        this.contatosService.cadastraContato(this.agenda_id, novoContato).subscribe(() => {
          this.router.navigate(['contatos']);
        });
      } else {
        this.erroEndereco = true;
      }
    } else {
      this.modalService.aparecer();
    }
  }

}
