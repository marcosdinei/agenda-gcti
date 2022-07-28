import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';

import { EnderecoFormComponent } from './endereco-form/endereco-form.component';
import { NovoEnderecoComponent } from './novo-endereco/novo-endereco.component';
import { EditarEnderecoComponent } from './editar-endereco/editar-endereco.component';



@NgModule({
  declarations: [
    NovoEnderecoComponent,
    EnderecoFormComponent,
    EditarEnderecoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NovoEnderecoComponent,
    EnderecoFormComponent,
    EditarEnderecoComponent
  ]
})
export class EnderecosModule { }
