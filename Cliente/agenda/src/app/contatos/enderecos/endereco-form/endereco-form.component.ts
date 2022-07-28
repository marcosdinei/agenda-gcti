import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EnderecosService } from '../enderecos.service';
import { ModalEnderecoService } from './../../../componentes/modal-endereco/modal-endereco.service';
import { Endereco, Enderecos } from './../endereco';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.css']
})
export class EnderecoFormComponent implements OnInit {

  @Input() enderecoForm!: FormGroup;
  @Input() enderecos: Enderecos = [];
  @Input() contato_id!: number;
  @Input() mostraMsgErro: boolean = false;
  @Input() erroEndereco: boolean = false;

  constructor(
    private modalEnderecoService: ModalEnderecoService,
    private enderecosService: EnderecosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  @Input() removeEndereco(endereco: Endereco) {}
  @Input() salvaEndereco() {}

  retiraErroEndereco() {
    this.enderecosService.retiraErroEndereco();
  }

}
