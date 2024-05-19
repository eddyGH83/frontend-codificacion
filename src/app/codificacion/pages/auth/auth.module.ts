import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [    
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule
  ]
})
export class AuthModule { }

