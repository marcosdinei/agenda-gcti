import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditarContatoComponent } from './editar-contato/editar-contato.component';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';
import { NovoContatoComponent } from './novo-contato/novo-contato.component';

const routes: Routes = [
  {
    path: '',
    component: ListaContatosComponent
  },
  {
    path: 'editar/:contato_id',
    component: EditarContatoComponent
  },
  {
    path: 'novo',
    component: NovoContatoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatosRoutingModule { }
