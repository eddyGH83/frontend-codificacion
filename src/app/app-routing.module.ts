import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { FormLayoutDemoComponent } from './demo/view/formlayoutdemo.component';
import { FloatLabelDemoComponent } from './demo/view/floatlabeldemo.component';
import { InvalidStateDemoComponent } from './demo/view/invalidstatedemo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MediaDemoComponent } from './demo/view/mediademo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppLoginComponent } from './pages/app.login.component';
import { InputDemoComponent } from './demo/view/inputdemo.component';
import { ButtonDemoComponent } from './demo/view/buttondemo.component';
import { TableDemoComponent } from './demo/view/tabledemo.component';
import { ListDemoComponent } from './demo/view/listdemo.component';
import { TreeDemoComponent } from './demo/view/treedemo.component';
import { IconsComponent } from './utilities/icons.component';
import { AppCrudComponent } from './pages/app.crud.component';
import { AppCalendarComponent } from './pages/app.calendar.component';
import { AppTimelineDemoComponent } from './pages/app.timelinedemo.component';
import { AppInvoiceComponent } from './pages/app.invoice.component';
import { AppHelpComponent } from './pages/app.help.component';
import { BlocksComponent } from './blocks/blocks/blocks.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', loadChildren: () => import('./codificacion/pages/auth/auth.module').then(m => m.AuthModule) },

            //{ path: '', component: AppLoginComponent },
            { path: 'error', component: AppErrorComponent },
            { path: 'access', component: AppAccessdeniedComponent },
            { path: 'notfound', component: AppNotfoundComponent },
            {
                path: '', component: AppMainComponent,
                children: [
                    //{path: '', component: DashboardDemoComponent},
                    //{ path: '', component: BlocksComponent },

                    
                    // Codificación
                    { path: 'dashboard', loadChildren: () => import('./codificacion/pages/dashboard/dashboard.module').then(m => m.DashboardModule) },

                    { path: 'codificacion', loadChildren: () => import('./codificacion/pages/codificacion/codificacion.module').then(m => m.CodificacionModule) },
                    // Perfil de usuario
                    { path: 'perfil', loadChildren: () => import('./codificacion/pages/perfil/perfil.module').then(m => m.PerfilModule) },

                    // Diccionarios
                    { path: 'diccionarios', loadChildren: () => import('./codificacion/pages/diccionarios/diccionarios.module').then(m => m.DiccionariosModule) },

                    // Usuarios
                    { path: 'usuarios', loadChildren: () => import('./codificacion/pages/usuarios/usuarios.module').then(m => m.UsuariosModule) },

                    // Reportes
                    { path: 'reportes', loadChildren: () => import('./codificacion/pages/reporte/reporte.module').then(m => m.ReporteModule) },

                    //ODBC
                    { path: 'odbc', loadChildren: () => import('./codificacion/pages/odbc/odbc.module').then(m => m.OdbcModule) },

                    // UsuCodificador
                    { path: 'usuCodificador', loadChildren: () => import('./codificacion/pages/usucodificador/usucodificador.module').then(m => m.UsucodificadorModule) },

                    // Asignación
                    { path: 'asignacion', loadChildren: () => import('./codificacion/pages/asignacion/asignacion.module').then(m => m.AsignacionModule) },



                    // Dashboard
                    //{ path: 'perfil', loadChildren: () => import('./codificacion/pages/perfil/perfil.module').then(m => m.PerfilModule) },


                    { path: 'uikit/formlayout', component: FormLayoutDemoComponent },
                    { path: 'uikit/floatlabel', component: FloatLabelDemoComponent },
                    { path: 'uikit/invalidstate', component: InvalidStateDemoComponent },
                    { path: 'uikit/input', component: InputDemoComponent },
                    { path: 'uikit/button', component: ButtonDemoComponent },
                    { path: 'uikit/table', component: TableDemoComponent },
                    { path: 'uikit/list', component: ListDemoComponent },
                    { path: 'uikit/tree', component: TreeDemoComponent },
                    { path: 'uikit/panel', component: PanelsDemoComponent },
                    { path: 'uikit/overlay', component: OverlaysDemoComponent },
                    { path: 'uikit/menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule) },
                    { path: 'uikit/media', component: MediaDemoComponent },
                    { path: 'uikit/message', component: MessagesDemoComponent },
                    { path: 'uikit/misc', component: MiscDemoComponent },
                    { path: 'uikit/charts', component: ChartsDemoComponent },
                    { path: 'uikit/file', component: FileDemoComponent },
                    { path: 'utilities/icons', component: IconsComponent },
                    { path: 'pages/crud', component: AppCrudComponent },
                    { path: 'pages/calendar', component: AppCalendarComponent },
                    { path: 'pages/timeline', component: AppTimelineDemoComponent },
                    { path: 'pages/invoice', component: AppInvoiceComponent },
                    { path: 'pages/help', component: AppHelpComponent },
                    { path: 'pages/empty', component: EmptyDemoComponent },
                    { path: 'documentation', component: DocumentationComponent },
                ]
            },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
