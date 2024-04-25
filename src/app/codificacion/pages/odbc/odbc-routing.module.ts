import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OdbcComponent } from './odbc.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component:OdbcComponent}
  ])],
  exports: [RouterModule]
})
export class OdbcRoutingModule { }
