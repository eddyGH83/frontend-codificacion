import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { SeguridadComponent } from './seguridad/seguridad.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component:PerfilComponent},
    { path: 'cambiar-contrasenia', component: SeguridadComponent },
  ])],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
