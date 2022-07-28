export interface Endereco {

  id: number;
  contato_id: number;
  rua: string;
  bairro: string;
  numero: number;
  uf: string;
  cep: string;

}

export type Enderecos = Array<Endereco>;

