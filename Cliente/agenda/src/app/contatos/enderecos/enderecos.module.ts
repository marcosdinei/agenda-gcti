import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { NovoEnderecoComponent } from './novo-endereco/novo-endereco.component';



@NgModule({
  declarations: [
    NovoEnderecoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NovoEnderecoComponent
  ]
})
export class EnderecosModule { }
