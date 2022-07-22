import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Contato } from './../contato';
import { ContatosService } from './../contatos.service';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent implements OnInit {

  contato_id!: number;
  contato = {
    nome: '',
    telefone: '',
    email: '',
    whatsapp: true
  };
  contato$!: Observable<Contato>;

  constructor(private contatosService: ContatosService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.contato_id = this.activatedRoute.snapshot.params['contato_id'];
    this.contato$ = this.contatosService.detalheContato(this.contato_id);
  }

  editaContato() {
    //TRANSFORMAR CONTATO$ EM CONTATO
    this.contatosService.editaContato(this.contato_id, this.contato);
  }

}
