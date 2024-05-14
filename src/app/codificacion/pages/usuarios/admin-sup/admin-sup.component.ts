import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuariosService } from '../services/usuarios.service';



@Component({
  selector: 'app-admin-sup',
  templateUrl: './admin-sup.component.html',
  styleUrls: ['./admin-sup.component.scss']
})
export class AdminSupComponent implements OnInit {



  // registros
  registros: any;
  registro: any;

  // Progress Bar
  tabla_pb: boolean = false;


  // registroDialog
  registroDialog: boolean;
  // reAsignacionDialog
  reAsignacionDialog: boolean;
  // resetDialog
  resetDialog: boolean;
  // eliminarDialog
  eliminarDialog: boolean;
  // reasignarDialog
  reasignarDialog: boolean;

  // submitted
  submitted: boolean;


  // roles
  roles: any;
  selectedRol: any;
  // jefes de turno
  jefesTurno: any;
  selectedJefeTurno: any;
  // supervisores
  supervisores: any;
  selectedSupervisor: any;
  // turnos
  turnos: any;
  selectedTurno: any;



  // botones acciones
  btnEditar: boolean = false;
  btnEliminar: boolean = false;
  btnResetPass: boolean = false;


  // dropdowns
  dropdownRoles: boolean = false;
  dropdownJTurnos: boolean = false;
  dropdownSupervisores: boolean = false;
  dropdownTurnos: boolean = false;


  //
  msgUserExit: boolean = false;


  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private usuariosService: UsuariosService) { }

  ngOnInit(): void {


    // BOTONES ACCIONES  (ok)
    this.btnEditar = false;
    this.btnEliminar = true;
    this.btnResetPass = false;


    // TURNOS (ok)
    this.turnos = [
      { turno: 'MAÑANA', descripcion: 'MAÑANA' },
      { turno: 'TARDE', descripcion: 'TARDE' }
    ];
    this.selectedTurno = { turno: 'MAÑANA', descripcion: 'MAÑANA' };


    //  ROLES (ok)
    this.roles = [
      { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' }
    ];
    this.selectedRol = { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' };



    this.registrosTabla();
  }


  registrosTabla() {
    this.tabla_pb = true;
    this.usuariosService.devuelveUsuarios({ rol_id: localStorage.getItem("rol_id"), id_usuario: localStorage.getItem("id_usuario"), login: localStorage.getItem("login") }).subscribe(
      (data2: any) => {
        //console.log("data2", data2.datos);
        this.tabla_pb = false;
        this.registros = data2.datos.rows;
      })
  }

  registrosSupervisores() {
    this.tabla_pb = true;
    this.usuariosService.devuelveSupervisores().subscribe(
      (data2: any) => {
        console.log(data2.datos.rows);
        this.tabla_pb = false;
        this.supervisores = data2.datos.rows;

        this.selectedSupervisor = {
          id_usuario: this.supervisores[0].id_usuario,
          nombres: this.supervisores[0].nombres
        };
      })
  }


  // [+ NUEVO]
  openNew() {
    this.registrosSupervisores();
    this.submitted = false;
    this.registro = {};
    this.registroDialog = true;


    this.dropdownRoles = true;
    this.dropdownSupervisores = false;


    // 
    this.roles = [
      { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' }
    ];
    this.selectedRol = { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' };

  }


  editRegistro(registro: any) {
    this.registrosSupervisores();

    this.registro = { ...registro };
    this.registroDialog = true;

    this.dropdownRoles = true;
    this.dropdownSupervisores = true;

    this.selectedRol = { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' };
    this.selectedSupervisor = this.supervisores.find((x: any) => x.id_usuario == registro.cod_supvsr);


  }


  hideDialog() {
    this.registroDialog = false;
    this.submitted = false;
  }



  deleteSelectedRegistro(registro: any) {
    this.registro = { ...registro };
    this.eliminarDialog = true;
  }

  confirmDeleteSelectedRegistro() {
    this.usuariosService.deleteUsuario({ id: this.registro.id_usuario, user: localStorage.getItem('login') }).subscribe(result => {
      this.eliminarDialog = false;
      this.registrosTabla();

      // Mensaje
      this.messageService.add({ severity: 'success', summary: 'Mensaje: ', detail: 'Usuario Eliminado!' });
      setTimeout(() => {
        this.messageService.clear();
      }, 2000);
    });
  }


  resetPassRegistro(registro: any) {
    this.registro = { ...registro };
    this.resetDialog = true;
  }
  confirmResetPassRegistro() {
    this.usuariosService.resetPassUsuario(this.registro.id_usuario).subscribe(result => {
      this.resetDialog = false;
      this.registrosTabla();

      // Mensaje
      this.messageService.add({ severity: 'success', summary: 'Mensaje: ', detail: '¡Contraseña Reseteado!' });
      setTimeout(() => {
        this.messageService.clear();
      }, 2000);

    });
  }


  reasignarRegistro(registro: any) {
    this.registro = { ...registro };
    this.reasignarDialog = true;
  }


  saveRegistro() {

    this.submitted = true;

    if (this.registro.nombres.trim() && this.registro.pr_apellido.trim() && this.registro.sg_apellido.trim()) {

      if (this.registro.id_usuario) {
        // alert("UPDATE");

        let body = {
          id_usuario: Number(localStorage.getItem('id_usuario')),
          nombres: this.registro.nombres,
          apellidos: this.registro.apellidos,
          login: this.registro.login,
          telefono: this.registro.telefono !== '' ? this.registro.telefono : '00',
          rol_id: this.selectedRol.rol_id,
          usucre: localStorage.getItem('login'),
          turno: null,// this.selectedRol.rol_id == 3 || this.selectedRol.rol_id == 4 ||this.selectedRol.rol_id == 6 ? this.selectedTurno.descripcion : null,
          cod_supvsr: Number(localStorage.getItem('id_usuario'))
        }

        // Verificación y Registro
        this.usuariosService.modificaUsuario(this.registro.id_usuario, body).subscribe(
          (data2: any) => {

            if (data2.success) {
              this.registroDialog = false;
              this.registro = {};
              this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: data2.message, life: 2500 });
            } else {
              this.msgUserExit = true;
              setTimeout(() => { this.msgUserExit = false; }, 4000);
            }

            this.registrosTabla();

          })

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });

      } else {
        alert("INSERT");

        let body = {
          id_usuario: Number(localStorage.getItem('id_usuario')),
          nombres: this.registro.nombres,
          pr_apellido: this.registro.pr_apellido,
          sg_apellido: this.registro.sg_apellido,
          //apellidos: this.registro.apellidos,
          //login: this.registro.login,
          telefono: this.registro.telefono !== undefined ? this.registro.telefono : '',
          rol_id: this.selectedRol.rol_id,
          usucre: localStorage.getItem('login'),
          //turno: null,// this.selectedRol.rol_id == 3 || this.selectedRol.rol_id == 4 ||this.selectedRol.rol_id == 6 ? this.selectedTurno.descripcion : null,
          cod_supvsr: Number(localStorage.getItem('id_usuario'))
        }

        // Verificación y Registro
        this.usuariosService.registraUsuario(body).subscribe(
          (data2: any) => {

            if (data2.success) {
              this.registroDialog = false;
              this.registro = {};
              this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: data2.message, life: 2500 });
            } else {
              this.msgUserExit = true;
              setTimeout(() => { this.msgUserExit = false; }, 4000);
            }

            this.registrosTabla();

          })

        this.registrosTabla();
      }

      // this.registros = [...this.registros];
      //this.registroDialog = false;

    }

  };





}
