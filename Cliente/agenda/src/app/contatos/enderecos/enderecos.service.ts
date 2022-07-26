import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment.prod';
import { Enderecos } from './endereco';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class EnderecosService {

  eventContatoId = new EventEmitter<number>();

  constructor(private httpClient: HttpClient) { }

  retornaContatoId(contato_id: number) {
    this.eventContatoId.emit(contato_id);
  }

  cadastraEndereco(contato_id: number, endereco: Object): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${ API }/enderecos/${ contato_id }`, endereco,
    {
      observe: 'response'
    });
  }

  listaDoContato(contato_id: number): Observable<Enderecos> {
    return this.httpClient.get<Enderecos>(`${ API }/enderecos/${ contato_id }`);
  }

}
