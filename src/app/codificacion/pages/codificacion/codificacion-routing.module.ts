import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarCargaCodificacionComponent } from './asignar-carga-codificacion/asignar-carga-codificacion.component';
import { AsignarCargaSupervisionComponent } from './asignar-carga-supervision/asignar-carga-supervision.component';
import { SupervisarCodificacionComponent } from './supervisar-codificacion/supervisar-codificacion.component';
import { CodificacionComponent } from './codificacion.component';
import { CodificacionSimpleComponent } from './codificacion-simple/codificacion-simple.component';
import { CodificacionDobleComponent } from './codificacion-doble/codificacion-doble.component';
import { SupervisionLoteSimpleComponent } from './supervision-lote-simple/supervision-lote-simple.component';
import { SupervisionLoteDobleComponent } from './supervision-lote-doble/supervision-lote-doble.component';
import { SupervisionIndividualSimpleComponent } from './supervision-individual-simple/supervision-individual-simple.component';
import { SupervisionIndividualDobleComponent } from './supervision-individual-doble/supervision-individual-doble.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CodificacionComponent },
    { path: 'codificacion-simple', component: CodificacionSimpleComponent },
    { path: 'codificacion-doble', component: CodificacionDobleComponent },
    { path: 'asignar-carga-codificacion', component: AsignarCargaCodificacionComponent },
    { path: 'asignar-carga-supervision', component: AsignarCargaSupervisionComponent },
    { path: 'supervisar-codificacion', component: SupervisarCodificacionComponent },

    { path: 'supervision-lotes-simple', component: SupervisionLoteSimpleComponent },
    { path: 'supervision-lotes-doble', component: SupervisionLoteDobleComponent },
    { path: 'supervision-individual-simple', component: SupervisionIndividualSimpleComponent },
    { path: 'supervision-individual-doble', component: SupervisionIndividualDobleComponent },
  ])],
  exports: [RouterModule]
})
export class CodificacionRoutingModule { }
