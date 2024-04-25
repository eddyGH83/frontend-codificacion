import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AuthService } from './codificacion/pages/auth/service/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    animations: [
        trigger('inline', [
            state('hidden', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*',
            })),
            state('hiddenAnimated', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visibleAnimated', style({
                height: '*',
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent, public appMain: AppMainComponent, private authService:AuthService) { }

    ngOnInit() {
        /* this.model = [
            {
                label: 'Dashboard', icon: 'pi pi-fw pi-microsoft',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-microsoft', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Diccionarios', icon: 'pi pi-fw pi-book',
                items: [
                    {
                        label: 'Catálogos', icon: 'pi pi-fw pi-bookmark', routerLink: ['/diccionarios/catalogos']
                    },
                    {
                        label: 'Corrector', icon: 'pi pi-fw pi-bookmark', routerLink: ['/diccionarios/corrector']
                    },
                    {
                        label: 'Matriz OcAcEc', icon: 'pi pi-fw pi-bookmark', routerLink: ['/diccionarios/matriz-ocupacion-actividad-economica']
                    }
                ]
            },
            {
                label: 'Asignación', icon: 'pi pi-fw pi-arrows-h',
                items: [
                    {
                        label: 'Asignar Carga - Cod.', icon: 'pi pi-fw pi-sort-numeric-down', routerLink: ['/codificacion/asignar-carga-codificacion']
                    },
                    {
                        label: 'Asignar Carga - Sup.', icon: 'pi pi-fw pi-sort-numeric-down', routerLink: ['/codificacion/asignar-carga-supervision']
                    }
                ]
            },
            {
                label: 'Codificación', icon: 'pi pi-fw pi-check-square',
                items: [
                    { label: 'Codificación', icon: 'pi pi-fw pi-check', routerLink: ['/usuCodificador'] }
                ]
            },
            {
                label: 'Supervisión', icon: 'pi pi-fw pi-eye',
                items: [                   
                    {
                        label: 'Supervisar Codificación', icon: 'pi pi-fw pi-check', routerLink: ['/codificacion/supervisar-codificacion']
                    }
                ]
            },
            {
                label: 'Gestion de datos', icon: 'pi pi-fw pi-database',
                items: [
                    { label: 'ODBC', icon: 'pi pi-fw pi-sort-alt', routerLink: ['/odbc'] }
                ]
            },
            {
                label: 'Reportes', icon: 'pi pi-fw pi-search',
                items: [
                    { label: 'Reportes', icon: 'pi pi-fw pi-table', routerLink: ['/reportes'] }
                ]
            },           
            {
                label: 'Gestion de usuarios', icon: 'pi pi-fw pi-cog',
                items: [
                    { label: 'Usuarios', icon: 'pi pi-fw pi-user-edit', routerLink: ['/usuarios'] }
                ]
            }
        ] */
        this.menu();
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }

    menu(){

        this.authService.devuelveMenu({ id_usuario: localStorage.getItem('id_usuario')}).subscribe(
            (data2: any) => {
                //console.log("data2", JSON.parse(data2));
                //this.model = data2[0];
                this.model = JSON.parse(data2);
                // this.tabla_pb = false;
                // this.registros = data2.datos.rows;
            }
        );

    }
}
