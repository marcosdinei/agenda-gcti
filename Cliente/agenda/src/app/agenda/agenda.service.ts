import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { environment } from './../../environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private httpClient: HttpClient) {
  }

  retornaIdAgenda(usuario_id: number): Observable<number> {
    return this.httpClient.get<number>(`${ API }/agenda/${ usuario_id }`);
  }
}
