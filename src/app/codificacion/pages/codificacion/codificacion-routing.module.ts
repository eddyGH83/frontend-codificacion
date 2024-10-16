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
import { RecodificacionDobleComponent } from './recodificacion-doble/recodificacion-doble.component';
import { RecodificacionSimpleComponent } from './recodificacion-simple/recodificacion-simple.component';
import { SupervisarCodificacionAutomaticaComponent } from './supervisar-codificacion-automatica/supervisar-codificacion-automatica.component';
import { SupervisionLoteSimpleAutomaticaComponent } from './supervision-lote-simple-automatica/supervision-lote-simple-automatica.component';
import { SupervisionLoteDobleAutomaticaComponent } from './supervision-lote-doble-automatica/supervision-lote-doble-automatica.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CodificacionComponent },
    { path: 'codificacion-simple', component: CodificacionSimpleComponent },
    { path: 'codificacion-doble', component: CodificacionDobleComponent },
    { path: 'asignar-carga-codificacion', component: AsignarCargaCodificacionComponent },
    { path: 'asignar-carga-supervision', component: AsignarCargaSupervisionComponent },
    { path: 'supervisar-codificacion', component: SupervisarCodificacionComponent },


    { path: 'supervisar-codificacion-automatica', component: SupervisarCodificacionAutomaticaComponent },
    { path: 'supervision-lotes-simple-automatica', component: SupervisionLoteSimpleAutomaticaComponent },
    { path: 'supervision-lotes-doble-automatica', component: SupervisionLoteDobleAutomaticaComponent },


    { path: 'supervision-lotes-simple', component: SupervisionLoteSimpleComponent },
    { path: 'supervision-lotes-doble', component: SupervisionLoteDobleComponent },
    { path: 'supervision-individual-simple', component: SupervisionIndividualSimpleComponent },
    { path: 'supervision-individual-doble', component: SupervisionIndividualDobleComponent },

    { path: 'recodificacion-lotes-simple', component: RecodificacionSimpleComponent },
    { path: 'recodificacion-lotes-doble', component: RecodificacionDobleComponent },
  ])],
  exports: [RouterModule]
})
export class CodificacionRoutingModule { }
