import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditarContatoComponent } from './editar-contato/editar-contato.component';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';

const routes: Routes = [
  {
    path: '',
    component: ListaContatosComponent
  },
  {
    path: ':contato_id',
    component: EditarContatoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatosRoutingModule { }
