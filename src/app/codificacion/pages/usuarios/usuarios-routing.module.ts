import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { AdminSupComponent } from './admin-sup/admin-sup.component';
import { AdminRespComponent } from './admin-resp/admin-resp.component';
import { AdminJturnoComponent } from './admin-jturno/admin-jturno.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: UsuariosComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'admin-sup', component: AdminSupComponent },
    { path: 'admin-jturno', component: AdminJturnoComponent },
    { path: 'admin-resp', component: AdminRespComponent }
  ])],
  exports: [RouterModule]
})

export class UsuariosRoutingModule { }
