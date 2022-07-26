import { Component, Input, OnInit } from '@angular/core';

import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  mostrar: boolean = false;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.eventMostraErro.subscribe(
      (event) => this.mostrar = event
    )
  }

  toggle() {
    this.mostrar = !this.mostrar;
  }

}
