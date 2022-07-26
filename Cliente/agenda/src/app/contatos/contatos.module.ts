import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ContatosRoutingModule } from './contatos-routing.module';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';
import { EnderecosModule } from './enderecos/enderecos.module';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';
import { NovoContatoComponent } from './novo-contato/novo-contato.component';


@NgModule({
  declarations: [
    ListaContatosComponent,
    EditarContatoComponent,
    NovoContatoComponent
  ],
  imports: [
    CommonModule,
    ContatosRoutingModule,
    EnderecosModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ContatosModule { }
