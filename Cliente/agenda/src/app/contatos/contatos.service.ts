import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { TokenService } from './../autenticacao/token.service';
import { Contatos } from './contato';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  listaDaAgenda(agenda_id: number): Observable<Contatos> {
    const token = this.tokenService.retornaToken();
    const headers = new HttpHeaders().append('Authorization', `Bearer ${ token }`);
    return this.httpClient.get<Contatos>(`${API}/agenda/${agenda_id}`, {
      headers
    });
  }

}
