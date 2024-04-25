import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { CorrectorComponent } from './corrector/corrector.component';
import { MatrizOcupActEconComponent } from './matriz-ocup-act-econ/matriz-ocup-act-econ.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'catalogos', component:CatalogosComponent},
    {path:'corrector', component:CorrectorComponent},
    {path:'matriz-ocupacion-actividad-economica', component:MatrizOcupActEconComponent}
  ])],
  exports: [RouterModule]
})
export class DiccionariosRoutingModule { }
