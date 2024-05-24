import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PerfilComponent } from './perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SeguridadComponent } from './seguridad/seguridad.component';



@NgModule({
  declarations: [  
    PerfilComponent, SeguridadComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    CheckboxModule,
    ChipModule,
    ChipsModule,
    ButtonModule,
    FormsModule,
    PasswordModule,
    MessagesModule,
    MessageModule
  ]
})
export class PerfilModule { }
