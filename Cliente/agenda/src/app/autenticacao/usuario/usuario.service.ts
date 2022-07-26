import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable, of } from 'rxjs';

import { TokenService } from '../token.service';
import { environment } from './../../../environments/environment';
import { Usuario } from './usuario';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario$ = new Observable<Usuario>;

   constructor(private tokenService: TokenService, private httpClient: HttpClient) {
    if (this.tokenService.possuiToken()) {
      this.decodificaJwt();
    }
  }

  decodificaJwt() {
    const token = this.tokenService.retornaToken();
    const jwt: any = jwtDecode(token);
    const usuario_id = jwt.sub;
    this.usuario$ = (this.httpClient.get<Usuario>(`${ API }/usuario/${ usuario_id }`));
  }

  retornaUsuario(): Observable<Usuario> {
    return this.usuario$;
  }

  salvaToken(token: string) {
    this.tokenService.salvaToken(token);
    this.decodificaJwt();
  }

  logout() {
    this.tokenService.excluiToken();
    this.usuario$ = this.httpClient.get(`${ API }/usuario/vazio`);
  }

  //possui token e o tempo logado é menor ou igual a 30min
  estaLogado(): boolean {
    if (this.tokenService.possuiToken()) {
      const token = this.tokenService.retornaToken();
      const jwt: any = jwtDecode(token);
      const expiracao = jwt.exp;
      const dataAtual = new Date();
      if (dataAtual.getTime() <= expiracao * 1000) {
        return true;
      }
    }

    return false;
  }

}
