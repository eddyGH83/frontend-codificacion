import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component:PerfilComponent}
  ])],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
