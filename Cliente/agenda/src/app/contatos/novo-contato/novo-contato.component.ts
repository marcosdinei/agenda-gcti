import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/agenda/agenda.service';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';

import { ContatosService } from '../contatos.service';
import { TelefoneExisteService } from './telefone-existe.service';

@Component({
  selector: 'app-novo-contato',
  templateUrl: './novo-contato.component.html',
  styleUrls: ['./novo-contato.component.css']
})
export class NovoContatoComponent implements OnInit {

  novoContatoForm!: FormGroup;
  agenda_id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private telefoneExisteService: TelefoneExisteService,
    private agendaService: AgendaService,
    private contatosService: ContatosService,
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
    this.novoContatoForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(255)]],
      telefone: ['', [Validators.required], [this.telefoneExisteService.telefoneExiste()]],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: [true]
    });
  }

  cadastraContato() {
    let novoContato = this.novoContatoForm.getRawValue();
    this.contatosService.cadastraContato(this.agenda_id, novoContato).subscribe(() => {
      this.router.navigate(['']);
    });
  }

}
