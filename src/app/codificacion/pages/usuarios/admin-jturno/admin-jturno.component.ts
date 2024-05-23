import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuariosService } from '../services/usuarios.service';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-admin-jturno',
  templateUrl: './admin-jturno.component.html',
  styleUrls: ['./admin-jturno.component.scss']
})
export class AdminJturnoComponent implements OnInit {

  // registros
  registros: any;
  registro: any;

  // Progress Bar
  tabla_pb: boolean = false;


  // registroDialog
  registroDialog: boolean;


  // submitted
  submitted: boolean;


  // roles
  roles: any;
  selectedRol: any;

  //
  id_usuario: any;

  // supervisores
  supervisores: any;
  selectedSupervisor: any;
  dropdownSupervisores: boolean = false;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    //  ROLES
    this.roles = [
      { rol_id: 4, descripcion: 'SUPERVISOR DE CODIFICACIÓN' },
      { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' }
    ];
    this.selectedRol = { rol_id: 4, descripcion: 'SUPERVISOR DE CODIFICACIÓN' };
    this.id_usuario = localStorage.getItem("id_usuario");

    this.registrosTabla();
  }


  // Opciones de Rol
  opcionesRol() {    
    if (this.selectedRol.rol_id == 4) {      
      this.dropdownSupervisores = false;
      this.id_usuario = localStorage.getItem("id_usuario");
    }

    if (this.selectedRol.rol_id == 5) {    
      this.dropdownSupervisores = true;
      this.registroSupervisores();
      this.selectedSupervisor = this.supervisores[0];
      this.id_usuario = this.selectedSupervisor.id_usuario;
    }
  }


  registrosTabla() {
    this.tabla_pb = true;
    this.usuariosService.devuelveUsuarios({ rol_id: localStorage.getItem("rol_id"), id_usuario: localStorage.getItem("id_usuario"), login: localStorage.getItem("login") }).subscribe(
      (data2: any) => {
        this.tabla_pb = false;
        this.registros = data2.datos.rows;
      })
  }


  // Registro de Supervisores
  registroSupervisores() {
    this.usuariosService.devuelveSupervisores().subscribe(
      (data2: any) => {
        this.supervisores = data2.datos.rows;
        //this.selectedSupervisor = this.supervisores[0];        
      })
  }


  // [+ NUEVO]
  openNew() {

    //this.registrosSupervisores();
    this.submitted = false;
    this.registro = {};
    this.registroDialog = true;

    // 
    /* this.roles = [
      { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' }
    ];
    this.selectedRol = { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' }; */

  }


  editRegistro(registro: any) {
    //this.registrosSupervisores();

    this.registro = { ...registro };
    this.registroDialog = true;

    this.selectedRol = { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' };
    //this.selectedSupervisor = this.supervisores.find((x: any) => x.id_usuario == registro.cod_supvsr);

  }


  hideDialog() {
    this.registroDialog = false;
    this.submitted = false;
  }



  saveRegistro() {

    this.submitted = true;

    if (this.registro.nombres.trim() && this.registro.pr_apellido.trim()) {

      if (this.registro.id_usuario) {

        // alert("UPDATE");        
        let body = {
          id_usuario: Number(localStorage.getItem('id_usuario')),  // Por este id se va a modificar al usuario

          nombres: this.registro.nombres,
          pr_apellido: this.registro.pr_apellido,
          sg_apellido: this.registro.sg_apellido !== undefined ? this.registro.sg_apellido : '',    //this.registro.sg_apellido,
          //apellidos: this.registro.apellidos,
          //login: this.registro.login,
          telefono: this.registro.telefono !== '' ? this.registro.telefono : '00',
          rol_id: this.selectedRol.rol_id,
          usumod: localStorage.getItem('login'),
          //turno: null,// this.selectedRol.rol_id == 3 || this.selectedRol.rol_id == 4 ||this.selectedRol.rol_id == 6 ? this.selectedTurno.descripcion : null,
          //cod_supvsr: Number(localStorage.getItem('id_usuario'))
        }

        // Verificación y Registro
        this.usuariosService.modificaUsuario(this.registro.id_usuario, body).subscribe(
          (data2: any) => {

            this.registroDialog = false;
            this.registro = {};
            this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: data2.message, life: 2500 });

            this.registrosTabla();

          })

      } else {
        // ADDED
        let body = {
          nombres: this.registro.nombres,                                                           // nombre
          pr_apellido: this.registro.pr_apellido,                                                   // pr_apellido
          sg_apellido: this.registro.sg_apellido !== undefined ? this.registro.sg_apellido : '',    // sg_apellido
          telefono: this.registro.telefono !== undefined ? this.registro.telefono : '',             // telefono
          rol_id: this.selectedRol.rol_id,                                                          // rol_id
          id_usuario: this.id_usuario                                                               // id_usuario
        }

        // Verificación y Registro
        this.usuariosService.registraUsuario(body).subscribe(
          (data2: any) => {
            this.registroDialog = false;
            this.registro = {};
            this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: data2.message, life: 2500 });
          })
        this.registrosTabla();
      }

      // this.registros = [...this.registros];
      //this.registroDialog = false;

    }

  };


  resetContrasenia(registro: any) {
    this.registro = { ...registro };

    this.confirmationService.confirm({
      message: '¿Está seguro de <strong>RESETEAR</strong> la contraseña de: <strong>' + this.registro.nombre_completo + '</strong>?',
      header: 'Confirmación',
      icon: 'pi pi-key',
      accept: () => {

        this.usuariosService.resetPassUsuario(this.registro.id_usuario).subscribe(result => {

          this.registrosTabla();

          // Mensaje
          this.messageService.add({ severity: 'success', summary: 'Mensaje: ', detail: '¡Contraseña Reseteado!' });
          setTimeout(() => {
            this.messageService.clear();
          }, 2000);

        });
      },
    });
  }

}
