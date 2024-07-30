import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AvanceCodificacionComponent } from './avance-codificacion/avance-codificacion.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component:DashboardComponent },
    { path: 'avance-codificacion', component: AvanceCodificacionComponent }
  ])],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
