import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsucodificadorRoutingModule } from './usucodificador-routing.module';
import { UsucodificadorComponent } from './usucodificador.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    UsucodificadorComponent
  ],
  imports: [
    CommonModule,
    UsucodificadorRoutingModule,
    TableModule,
    ButtonModule
  ]
})
export class UsucodificadorModule { }
