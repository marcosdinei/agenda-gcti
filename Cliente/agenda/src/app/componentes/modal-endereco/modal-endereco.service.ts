import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalEnderecoService {

  eventDesaparecer = new EventEmitter<boolean>();

  constructor() { }

  desaparecer() {
    this.eventDesaparecer.emit(false);
  }
}
