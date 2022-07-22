import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ContatosRoutingModule } from './contatos-routing.module';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';


@NgModule({
  declarations: [
    ListaContatosComponent,
    EditarContatoComponent
  ],
  imports: [
    CommonModule,
    ContatosRoutingModule,
    FormsModule
  ]
})
export class ContatosModule { }
