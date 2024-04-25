import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    usuario: string = localStorage.getItem('login');
    nombres: string = localStorage.getItem('nombres') + ' ' + localStorage.getItem('apellidos');
    rol: string = localStorage.getItem('rol_descripcion');

    constructor(public app: AppComponent, public appMain: AppMainComponent, private router: Router) {}

    cerrarSesion() {
      localStorage.removeItem('token_cod');
      this.router.navigate(['/']);
    }

}
