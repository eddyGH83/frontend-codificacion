import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarCargaCodificacionComponent } from './asignar-carga-codificacion/asignar-carga-codificacion.component';
import { AsignarCargaSupervisionComponent } from './asignar-carga-supervision/asignar-carga-supervision.component';
import { SupervisarCodificacionComponent } from './supervisar-codificacion/supervisar-codificacion.component';
import { CodificacionComponent } from './codificacion.component';
import { CodificacionSimpleComponent } from './codificacion-simple/codificacion-simple.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CodificacionComponent },
    { path: 'codificacion-simple', component: CodificacionSimpleComponent },
    { path: 'asignar-carga-codificacion', component: AsignarCargaCodificacionComponent },
    { path: 'asignar-carga-supervision', component: AsignarCargaSupervisionComponent },
    { path: 'supervisar-codificacion', component: SupervisarCodificacionComponent },
  ])],
  exports: [RouterModule]
})
export class CodificacionRoutingModule { }
