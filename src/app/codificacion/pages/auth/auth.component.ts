import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {



  usuario: any = {
    usu: '',
    pass: ''
  }

  // progress bar
  login_pb: boolean = false;

  validUsu: boolean = true;
  validPass: boolean = true;

  registros: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

  }

  verificarUsuario() {

    if (this.usuario.pass.trim().length == 0) {
      this.validPass = false;
    } else {
      this.validPass = true;
    }

    if (this.usuario.usu.trim().length == 0) {
      this.validUsu = false;
    } else {
      this.validUsu = true;
    }


    if (this.validUsu && this.validPass) {
      //alert('Debe ingresar usuario y contraseña');
      //this.login_pb = true;
      this.authService.iniciarSesion(this.usuario).subscribe(
        (data2: any) => {
          // this.login_pb = false;
          if (data2.success == true) {

            localStorage.setItem('nombres', data2.data.nombres)
            //localStorage.setItem('apellidos', data2.data.apellidos)
            localStorage.setItem('pr_apellido', data2.data.pr_apellido)
            localStorage.setItem('sg_apellido', data2.data.sg_apellido)
            localStorage.setItem('rol_id', data2.data.rol_id)
            localStorage.setItem('login', data2.data.login)
            localStorage.setItem('rol_descripcion', data2.data.rol_descripcion)
            localStorage.setItem('rol_codigo', data2.data.rol_codigo)
            localStorage.setItem('id_usuario', data2.data.id_usuario)
            localStorage.setItem('telefono', data2.data.telefono)

            //localStorage.setItem('token_cod', data2.token_cod);
            this.router.navigate(['/perfil']);

          }

          if (data2.success == false) {
            //localStorage.setItem('token_cod', data2.token_cod);
            alert('Usuario no encontrado')
            this.usuario.usu = '';
            this.usuario.pass = '';
          }

        })

    }

  }


}
