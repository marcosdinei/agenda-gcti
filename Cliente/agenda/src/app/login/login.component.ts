import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutenticacaoService } from '../autenticacao/autenticacao.service';
import { UsuarioService } from './../autenticacao/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = '';
  senha = '';

  constructor(private usuarioService: UsuarioService, private autenticacaoService: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {
  }

  fazerLogin() {
    this.autenticacaoService.autenticar(this.usuario, this.senha).subscribe(
      {
        next: (res) => {
          const jsonBody = JSON.stringify(res.body);
          let id_usuario = parseInt(jsonBody?.charAt(6));
          this.usuarioService.retornaUsuarioPeloId(id_usuario);
          this.router.navigate(['contatos'])
        },
        error: () => {
          alert("Usuário ou senha inválidos")
        }
      }
    );
  }

}
