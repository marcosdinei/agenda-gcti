import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { TokenService } from './../autenticacao/token.service';
import { Agenda } from './agenda';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
  }

  retornaIdAgenda(usuario_id: number): Observable<number> {
    const token = this.tokenService.retornaToken();
    const headers = new HttpHeaders().append('Authorization', `Bearer ${ token }`);
    return this.httpClient.get<number>(`${ API }/agenda/${ usuario_id }`, {
      headers
    });
  }
}
