import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { MensagemModule } from '../componentes/mensagem/mensagem.module';
import { ModalModule } from '../componentes/modal/modal.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MensagemModule,
    ModalModule
  ],
  exports: [
    FormsModule,
    MensagemModule,
    ModalModule
  ]
})
export class SharedModule { }
