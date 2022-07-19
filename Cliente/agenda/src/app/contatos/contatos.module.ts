import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosRoutingModule } from './contatos-routing.module';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';
import { ContatoComponent } from './contato/contato.component';


@NgModule({
  declarations: [
    ListaContatosComponent,
    ContatoComponent
  ],
  imports: [
    CommonModule,
    ContatosRoutingModule
  ]
})
export class ContatosModule { }
