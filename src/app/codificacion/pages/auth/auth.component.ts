import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MessageService } from 'primeng/api';

// Para los mensajes  
// import { ConfirmationService, MessageService } from 'primeng/api';
// import { MessagesModule } from 'primeng/messages';
// import { MessageModule } from 'primeng/message';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  //
  /* miFormulario: FormGroup = new FormGroup({
    usu: new FormControl('epaco '),
    pass: new FormControl('epaco*---*')
  }); */

  // FormBuilder
  miFormulario: FormGroup = this.fb.group({
    usu: ['', [Validators.required, Validators.minLength(5)]],
    pass: ['', [Validators.required, Validators.minLength(6)]]
  })


  /*  usuario: any = {
     usu: this.miFormulario.get('usu')?.value,
     pass: this.miFormulario.get('pass')?.value
   } */

  // progress bar
  login_pb: boolean = false;

  validUsu: boolean = true;
  validPass: boolean = true;

  registros: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
    //private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }



  verificarUsuario() {
    this.authService.iniciarSesion({ usu: this.miFormulario.get('usu')?.value, pass: this.miFormulario.get('pass')?.value }).subscribe(
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


          // authService
          /* this.authService.authVariables = {
            usuario: data2.data.login,
            id: data2.data.id_usuario,
            rol: data2.data.rol_codigo,
            nombre: data2.data.nombres,
            apellido: data2.data.pr_apellido,
            email: data2.data.email,
            departamento: data2.data.departamento
          } */

          //localStorage.setItem('token_cod', data2.token_cod);
          this.router.navigate(['/perfil']); 

        }

        if (data2.success == false) {
          //localStorage.setItem('token_cod', data2.token_cod);
          /* this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'}); */
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Usuario no encontrado'});
          // alert('Usuario no encontrado')
          /* this.usuario.usu = '';
          this.usuario.pass = ''; */
        }

      })

  }


}
