import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from './../../environments/environment';
import { UsuarioService } from './usuario/usuario.service';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private httpClient: HttpClient, private usuarioService: UsuarioService) { }

  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${ API }/auth`,
    {
      login: usuario,
      senha: senha
    },
    {
      observe: 'response'
    }).pipe(
      tap((resposta) => {
        const jsonBody = JSON.stringify(resposta.body);
        const authToken = jsonBody?.slice(10, jsonBody.length - 18);
        this.usuarioService.salvaToken(authToken);
      })
    );
  }

}
