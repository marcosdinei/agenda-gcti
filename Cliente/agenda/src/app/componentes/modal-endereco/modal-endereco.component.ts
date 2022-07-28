import { Component, Input, OnInit } from '@angular/core';

import { ModalEnderecoService } from './modal-endereco.service';

@Component({
  selector: 'app-modal-endereco',
  templateUrl: './modal-endereco.component.html',
  styleUrls: ['./modal-endereco.component.css']
})
export class ModalEnderecoComponent implements OnInit {

  @Input()
  mostrar: boolean = false;

  constructor(private modalEnderecoService: ModalEnderecoService) { }

  ngOnInit(): void {
    this.modalEnderecoService.eventDesaparecer.subscribe(
      (event) => this.mostrar = event
    );
  }

  toggle() {
    this.mostrar = !this.mostrar;
  }
}
