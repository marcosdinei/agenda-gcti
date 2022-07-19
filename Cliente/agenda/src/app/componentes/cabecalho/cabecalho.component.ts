import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faAddressBook, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { UsuarioService } from './../../autenticacao/usuario/usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {

  faUserCircle = faUserCircle;
  faAdressBook = faAddressBook;

  //usuario$ = this.usuarioService.retornaUsuario();

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['']);
  }

}
