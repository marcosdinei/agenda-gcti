import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutenticacaoService } from '../autenticacao/autenticacao.service';
import { ModalService } from '../componentes/modal/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = '';
  senha = '';

  constructor(private autenticacaoService: AutenticacaoService, private modalService: ModalService, private router: Router) { }

  ngOnInit(): void {
  }

  fazerLogin() {
    this.autenticacaoService.autenticar(this.usuario, this.senha).subscribe(
      {
        next: () => {
          this.router.navigate(['contatos'])
        },
        error: () => {
          this.modalService.aparecer();
        }
      }
    );
  }

}
