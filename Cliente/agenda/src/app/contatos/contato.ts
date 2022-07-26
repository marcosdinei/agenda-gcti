export interface Contato {

  id: number;
  agenda_id: number;
  nome: string;
  telefone: string;
  email: string;
  whatsapp: boolean;
  ativo: boolean;
  data_cadastro: Date;

}

export type Contatos = Array<Contato>;

export interface ContatoForm {

  nome: string;
  telefone: string;
  email: string;
  whatsapp: boolean;

}

export type ContatosForm = Array<ContatoForm>;
