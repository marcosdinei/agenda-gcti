import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EnderecosService } from './../enderecos.service';

@Component({
  selector: 'app-novo-endereco',
  templateUrl: './novo-endereco.component.html',
  styleUrls: ['./novo-endereco.component.css']
})
export class NovoEnderecoComponent implements OnInit {

  novoEnderecoForm!: FormGroup;
  enderecos: Array<any> = [];
  contato_id!: number;

  constructor(private formBuilder: FormBuilder, private enderecosService: EnderecosService) { }

  ngOnInit(): void {
    this.enderecosService.eventContatoId.subscribe(
      (event) => {
        this.contato_id = event;
        this.cadastraEnderecos();
      }
    );
    this.novoEnderecoForm = this.formBuilder.group({
      rua: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      uf: ['AC'],
      cep: ['', [Validators.required]]
    });
  }

  guardaEndereco() {
    let novoEndereco = this.novoEnderecoForm.getRawValue();
    this.enderecos.push(novoEndereco);
  }

  cadastraEnderecos() {
    this.enderecos.forEach(endereco => {
      this.enderecosService.cadastraEndereco(this.contato_id, endereco).subscribe();
    });
  }

}
