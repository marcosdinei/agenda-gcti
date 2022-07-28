import { ModalEnderecoModule } from './../componentes/modal-endereco/modal-endereco.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MensagemModule } from '../componentes/mensagem/mensagem.module';
import { ModalModule } from '../componentes/modal/modal.module';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MensagemModule,
    ModalModule,
    ModalEnderecoModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ],
  exports: [
    FormsModule,
    MensagemModule,
    ModalModule,
    ModalEnderecoModule,
    ReactiveFormsModule,
    NgxMaskModule
  ]
})
export class SharedModule { }
