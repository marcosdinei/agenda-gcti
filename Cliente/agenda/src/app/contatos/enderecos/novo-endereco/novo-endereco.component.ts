import { Component, OnInit } from '@angular/core';

import { EnderecosService } from './../enderecos.service';

@Component({
  selector: 'app-novo-endereco',
  templateUrl: './novo-endereco.component.html',
  styleUrls: ['./novo-endereco.component.css']
})
export class NovoEnderecoComponent implements OnInit {

  contato_id!: number;
  rua!: string;
  bairro!: string;
  numero!: number;
  uf!: string;
  cep!: string;

  constructor(private enderecosService: EnderecosService) { }

  ngOnInit(): void {
    this.enderecosService.eventContatoId.subscribe(
      (event) => {
        this.contato_id = event;
        this.cadastraEndereco();
      }
    )
  }

  cadastraEndereco() {
    let novoEndereco = {
      rua: this.rua,
      bairro: this.bairro,
      numero: this.numero,
      uf: this.uf,
      cep: this.cep,
    }
    this.enderecosService.cadastraEndereco(this.contato_id, novoEndereco).subscribe();
  }

}
