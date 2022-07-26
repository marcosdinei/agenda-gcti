import { Component, Input, OnInit } from '@angular/core';

import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  mostraErro: boolean = false;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.eventMostraErro.subscribe(
      (event) => this.mostraErro = event
    )
  }

  toggle() {
    this.mostraErro = !this.mostraErro;
  }

}
