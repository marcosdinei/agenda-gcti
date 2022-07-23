import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ModalModule } from '../componentes/modal/modal.module';
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
    FormsModule,
    ModalModule
  ]
})
export class ContatosModule { }
