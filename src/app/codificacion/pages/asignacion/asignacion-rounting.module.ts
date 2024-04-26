import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionComponent } from './asignacion.component';
import { CargaCodificadorComponent } from './carga-codificador/carga-codificador.component';
import { CargaSupervisorComponent } from './carga-supervisor/carga-supervisor.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: AsignacionComponent },
    { path: 'carga-cod', component: CargaCodificadorComponent },
    { path: 'carga-sup', component: CargaSupervisorComponent },
  ])],
  exports: [RouterModule]
})
export class AsignacionRoutingModule { }
