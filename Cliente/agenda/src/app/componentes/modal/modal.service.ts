import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  eventMostraErro = new EventEmitter<any>();

  constructor() { }

  aparecer() {
    this.eventMostraErro.emit(true);
  }

}
