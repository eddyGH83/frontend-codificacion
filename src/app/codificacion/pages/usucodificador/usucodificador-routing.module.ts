import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsucodificadorComponent } from './usucodificador.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component:UsucodificadorComponent}
  ])],
  exports: [RouterModule]
})
export class UsucodificadorRoutingModule { }
