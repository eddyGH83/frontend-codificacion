import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupervisionComponent } from './supervision.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component:SupervisionComponent}
  ])],
  exports: [RouterModule]
})
export class SupervisionRoutingModule { }
