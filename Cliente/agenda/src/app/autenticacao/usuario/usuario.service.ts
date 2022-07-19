import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { catchError, map, Observable, BehaviorSubject } from 'rxjs';

import { TokenService } from '../token.service';
import { environment } from './../../../environments/environment';
import { Usuario } from './usuario';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubject = new BehaviorSubject<Usuario>({});

   constructor(private tokenService: TokenService, private httpClient: HttpClient) {
    if (this.tokenService.possuiToken()) {
      this.decodificaJwt();
    }
  }

  decodificaJwt() {
    const token = this.tokenService.retornaToken();
    const usuario = jwtDecode(token) as Usuario;
    this.usuarioSubject.next(usuario);
  }

  retornaUsuario(): Observable<Usuario> {
    return this.usuarioSubject.asObservable();
  }

  retornaUsuarioPeloId(usuario_id: number): Observable<Usuario> {
    const token = this.tokenService.retornaToken();
    const headers = new HttpHeaders().append('Authorization', `Bearer ${ token }`);
    return this.httpClient.get<Usuario>(`${ API }/usuario/${ usuario_id }`, {headers});
  }

  salvaToken(token: string) {
    this.tokenService.salvaToken(token);
    this.decodificaJwt();
  }

  logout() {
    this.tokenService.excluiToken();
    this.usuarioSubject.next({});
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }

}
