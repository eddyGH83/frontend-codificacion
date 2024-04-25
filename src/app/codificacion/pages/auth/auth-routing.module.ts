import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component: AuthComponent}
  ])],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
