import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';


@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

  usuario: string = localStorage.getItem('login');
  nombres: string = localStorage.getItem('nombres') + ' ' + localStorage.getItem('pr_apellido') + ' ' + localStorage.getItem('sg_apellido');
  rol: string = localStorage.getItem('rol_descripcion');

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, public app: AppComponent, public appMain: AppMainComponent, private router: Router) { }


  cerrarSesion() {
    this.confirmationService.confirm({
      message: '¿Estás seguro/a que deseas salir?',
      header: 'Confirmación',
      icon: 'pi pi-fw pi-power-off',
      accept: () => {
        localStorage.removeItem('token_cod');
        // eliminar todas las variables de sesión en el localStorage
        localStorage.clear();

        this.router.navigate(['/']);        
      }
    });
  }

}
