import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  nome!: string;
  telefone!: string;
  email!: string;
  whatsapp!: boolean;

  constructor(private contatosService: ContatosService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.contato_id = this.activatedRoute.snapshot.params['contato_id'];
    this.contatosService.detalheContato(this.contato_id).subscribe((contato) => {
      this.nome = contato.nome;
      this.telefone = contato.telefone;
      this.email = contato.email;
      this.whatsapp = contato.whatsapp;
    });
  }

  editaContato() {
    let novoContato = {
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      whatsapp: this.whatsapp
    }
    this.contatosService.editaContato(this.contato_id, novoContato).subscribe();
    this.router.navigate(['contatos']);
  }

  excluiContato() {
    this.contatosService.excluiContato(this.contato_id).subscribe();
    this.router.navigate(['contatos']);
  }

}
