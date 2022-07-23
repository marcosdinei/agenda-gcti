import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

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
  contatos$!: Observable<Contatos>;

  constructor(private usuarioService: UsuarioService, private agendaService: AgendaService, private contatosService: ContatosService) { }

  ngOnInit(): void {
    this.contatos$ = this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
        const usuario_id = usuario.id ?? 0;
        return this.agendaService.retornaIdAgenda(usuario_id).pipe(
          switchMap((agenda_id) => {
            return this.contatosService.listaDaAgenda(agenda_id);
          })
        );
      })
    );
  }

}
