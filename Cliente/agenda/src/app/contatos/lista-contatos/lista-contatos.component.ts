import { Component, Input, OnInit } from '@angular/core';

import { AgendaService } from './../../agenda/agenda.service';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { Contatos } from './../contato';
import { ContatosService } from './../contatos.service';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit {

  @Input()
  contatos!: Contatos;

  private usuario_id!: string;

  constructor(private usuarioService: UsuarioService, private agendaService: AgendaService, private contatosService: ContatosService) { }

  ngOnInit(): void {
    this.usuario_id = this.usuarioService.retornaIdUsuarioLogado();
      this.agendaService.retornaIdAgenda(parseInt(this.usuario_id)).subscribe((agenda_id) => {
        this.contatosService.listaDaAgenda(agenda_id).subscribe((contatos) => {
          this.contatos = contatos;
        });
      });
  }
}
