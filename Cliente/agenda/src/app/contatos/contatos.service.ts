import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';

import { environment } from './../../environments/environment';
import { Contato, Contatos } from './contato';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  constructor(private httpClient: HttpClient) { }

  listaDaAgenda(agenda_id: number): Observable<Contatos> {
    return this.httpClient.get<Contatos>(`${API}/contatos/${ agenda_id }`);
  }

  detalheContato(contato_id: number): Observable<Contato> {
    return this.httpClient.get<Contato>(`${ API }/contatos/detalhe/${ contato_id }`);
  }

  editaContato(contato_id: number, contato: Object): Observable<HttpResponse<any>> {
    return this.httpClient.put<Contato>(`${ API }/contatos/${ contato_id }`, contato,
    {
      observe: 'response'
    });
  }

  excluiContato(contato_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${ API }/contatos/${ contato_id }`).pipe(take(1));
  }

}
