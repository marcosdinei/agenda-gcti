import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

import { environment } from './../../../environments/environment.prod';
import { Enderecos } from './endereco';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class EnderecosService {

  eventContatoId = new EventEmitter<number>();
  eventEnderecos = new EventEmitter<Enderecos>();
  eventErroEndereco = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient) { }

  retornaContatoId(contato_id: number) {
    this.eventContatoId.emit(contato_id);
  }

  retiraErroEndereco() {
    this.eventErroEndereco.emit(false);
  }

  listaEnderecos(enderecos: Enderecos) {
    this.eventEnderecos.emit(enderecos);
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

  excluiEndereco(endereco_id: number): Observable<any> {
    return this.httpClient.delete(`${ API }/enderecos/${ endereco_id }`).pipe(take(1));
  }

}
