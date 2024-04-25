import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Reporte1Component } from './reportes/reporte1.component';
import { ReporteComponent } from './reporte.component';
import { Reporte2Component } from './reportes/reporte2.component';
import { Reporte3Component } from './reportes/reporte3.component';
import { Reporte4Component } from './reportes/reporte4.component';
import { Reporte5Component } from './reportes/reporte5.component';
import { Reporte6Component } from './reportes/reporte6.component';
import { Reporte7Component } from './reportes/reporte7.component';
import { Reporte8Component } from './reportes/reporte8.component';
import { Reporte9Component } from './reportes/reporte9.component';
import { Reporte10Component } from './reportes/reporte10.component';
import { Reporte11Component } from './reportes/reporte11.component';
import { Reporte12Component } from './reportes/reporte12.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component: ReporteComponent},
    {path:'reporte1', component: Reporte1Component},
    {path:'reporte2', component: Reporte2Component},
    {path:'reporte3', component: Reporte3Component},
    {path:'reporte4', component: Reporte4Component},
    {path:'reporte5', component: Reporte5Component},
    {path:'reporte6', component: Reporte6Component},
    {path:'reporte7', component: Reporte7Component},
    {path:'reporte8', component: Reporte8Component},
    {path:'reporte9', component: Reporte9Component},
    {path:'reporte10', component: Reporte10Component},
    {path:'reporte11', component: Reporte11Component},
    {path:'reporte12', component: Reporte12Component},
  ])],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
