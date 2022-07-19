import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';

const routes: Routes = [
  {
    path: '',
    component: ListaContatosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatosRoutingModule { }
