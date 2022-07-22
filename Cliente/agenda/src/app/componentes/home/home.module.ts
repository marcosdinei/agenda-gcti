import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContatosModule } from './../../contatos/contatos.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ContatosModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
