import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosRoutingModule } from './contatos-routing.module';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';


@NgModule({
  declarations: [
    ListaContatosComponent
  ],
  imports: [
    CommonModule,
    ContatosRoutingModule
  ]
})
export class ContatosModule { }
