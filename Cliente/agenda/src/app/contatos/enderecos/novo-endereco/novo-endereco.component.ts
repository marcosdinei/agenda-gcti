import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Endereco, Enderecos } from '../endereco';
import { ModalEnderecoService } from './../../../componentes/modal-endereco/modal-endereco.service';
import { EnderecosService } from './../enderecos.service';

@Component({
  selector: 'app-novo-endereco',
  templateUrl: './novo-endereco.component.html',
  styleUrls: ['./novo-endereco.component.css']
})
export class NovoEnderecoComponent implements OnInit {

  enderecoForm!: FormGroup;
  enderecos: Enderecos = [];
  contato_id!: number;
  mostraMsgErro: boolean = false;
  @Input() erroEndereco!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private enderecosService: EnderecosService,
    private modalEnderecoService: ModalEnderecoService
  ) { }

  ngOnInit(): void {
    this.enderecosService.eventContatoId.subscribe(
      (event) => {
        this.contato_id = event;
        this.cadastraEnderecos();
      }
    );
    this.enderecoForm = this.formBuilder.group({
      rua: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      uf: ['AC'],
      cep: ['', [Validators.required]]
    });
  }

  removeEndereco(enderecoRemovido: Endereco) {
    const index = this.enderecos.indexOf(enderecoRemovido);
    this.enderecos.splice(index, 1);
    this.enderecosService.listaEnderecos(this.enderecos);
  }

  salvaEndereco() {
    if (this.enderecoForm.valid) {
      const novoEndereco = this.enderecoForm.getRawValue();
      this.enderecos.push(novoEndereco);
      this.modalEnderecoService.desaparecer();
      this.enderecosService.listaEnderecos(this.enderecos);
    } else {
      this.mostraMsgErro = true;
    }
  }

  cadastraEnderecos() {
    this.enderecos.forEach(endereco => {
      this.enderecosService.cadastraEndereco(this.contato_id, endereco).subscribe();
    });
  }

}
