import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAddressBook, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { UsuarioService } from '../../autenticacao/usuario/usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faUserCircle = faUserCircle;
  faAdressBook = faAddressBook;

  usuario$ = this.usuarioService.retornaUsuario();

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {

      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {

          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          if ($target != null)
            $target.classList.toggle('is-active');

        });
      });

    });
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['']);
  }

}
