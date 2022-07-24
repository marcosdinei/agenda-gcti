import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AgendaService } from 'src/app/agenda/agenda.service';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';

import { ContatosService } from '../contatos.service';

@Component({
  selector: 'app-novo-contato',
  templateUrl: './novo-contato.component.html',
  styleUrls: ['./novo-contato.component.css']
})
export class NovoContatoComponent implements OnInit {

  agenda_id!: number;
  nome!: string;
  telefone!: string;
  email!: string;
  whatsapp!: boolean;

  constructor(private usuarioService: UsuarioService, private agendaService: AgendaService, private contatosService: ContatosService, private router: Router) { }

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
  }

  cadastraContato() {
    let novoContato = {
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      whatsapp: this.whatsapp
    }
    this.contatosService.cadastraContato(this.agenda_id, novoContato).subscribe();
    this.router.navigate(['']);
  }

}
