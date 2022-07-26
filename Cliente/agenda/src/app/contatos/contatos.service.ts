import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';

import { environment } from './../../environments/environment';
import { Contato, Contatos } from './contato';
import { EnderecosService } from './enderecos/enderecos.service';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  constructor(private httpClient: HttpClient, private enderecosService: EnderecosService) { }

  listaDaAgenda(agenda_id: number): Observable<Contatos> {
    return this.httpClient.get<Contatos>(`${ API }/contatos/${ agenda_id }`);
  }

  cadastraContato(agenda_id: number, contato: Object): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${ API }/contatos/${ agenda_id }`, contato,
    {
      observe: 'response'
    }).pipe(
      tap((resposta) => {
        const jsonBody = JSON.stringify(resposta.body);
        const contato_id = parseInt(jsonBody.slice(jsonBody.indexOf(':') + 1, jsonBody.indexOf(',')));
        this.enderecosService.retornaContatoId(contato_id);
      })
    );
  }

  detalheContato(contato_id: number): Observable<Contato> {
    return this.httpClient.get<Contato>(`${ API }/contatos/detalhe/${ contato_id }`);
  }

  editaContato(contato_id: number, novoContato: Object): Observable<HttpResponse<any>> {
    return this.httpClient.put(`${ API }/contatos/${ contato_id }`, novoContato,
    {
      observe: 'response'
    });
  }

  excluiContato(contato_id: number): Observable<any> {
    return this.httpClient.delete(`${ API }/contatos/${ contato_id }`).pipe(take(1));
  }

}
