import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuariosService } from '../services/usuarios.service';
import { Message } from 'primeng/api';




@Component({
  selector: 'app-admin-resp',
  templateUrl: './admin-resp.component.html',
  styleUrls: ['./admin-resp.component.scss']
})
export class AdminRespComponent implements OnInit {

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

  // turnos
  turnos: any;
  selectedTurno: any;
  dropdownTurnos: boolean = false;
  turnoAux: any;

  //
  id_usuario: any;

  // supervisores
  supervisores: any;
  selectedSupervisor: any;
  dropdownSupervisores: boolean = false;

  // Jefes de Turno
  jefesTurno: any;
  selectedJefeTurno: any;
  dropdownJefesTurno: boolean = false;



  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private usuariosService: UsuariosService) { }




  ngOnInit(): void {
    //  ROLES
    this.roles = [
      { rol_id: 3, descripcion: 'JEFE DE TURNO' },
      { rol_id: 4, descripcion: 'SUPERVISOR DE CODIFICACIÓN' },
      { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' },
      { rol_id: 6, descripcion: 'TÉCNICO DE CONTINGENCIA' }
    ];
    this.selectedRol = { rol_id: 3, descripcion: 'JEFE DE TURNO' };
    this.id_usuario = localStorage.getItem("id_usuario");

    // TURNOS
    this.turnos = [
      { turno: 'Mañana', descripcion: 'MAÑANA' },
      { turno: 'Tarde', descripcion: 'TARDE' }
    ];
    this.selectedTurno = { turno: 'Mañana', descripcion: 'MAÑANA' };

    this.registrosTabla();
    this.opcionesRol();
  }


  // Opciones de Rol
  opcionesRol() {
    // Si selecciona JEFE DE TURNO:
    if (this.selectedRol.rol_id == 3) {
      this.dropdownJefesTurno = false;
      this.dropdownSupervisores = false;
      this.dropdownTurnos = true;
    }

    // Si selecciona SUPERVISOR DE CODIFICACIÓN:
    if (this.selectedRol.rol_id == 4) {
      this.dropdownJefesTurno = true;
      this.dropdownSupervisores = false;
      this.dropdownTurnos = false;
      this.registroJefesTurno();
    }

    // Si selecciona TÉCNICO EN CODIFICACIÓN:
    if (this.selectedRol.rol_id == 5) {
      this.dropdownJefesTurno = false;
      this.dropdownSupervisores = true;
      this.dropdownTurnos = false;
      this.registroSupervisores();
    }

    // Si selecciona TÉCNICO DE CONTINGENCIA:
    if (this.selectedRol.rol_id == 6) {
      this.dropdownJefesTurno = false;
      this.dropdownSupervisores = false;
      this.dropdownTurnos = true;
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

  // Registro de Jefes de Turno
  registroJefesTurno() {
    this.usuariosService.devuelveJefesTurno().subscribe(
      (data2: any) => {
        this.jefesTurno = data2.datos.rows;
        //this.selectedJefeTurno = this.jefesTurno[0];
      })
  }


  // [+ NUEVO]
  openNew() {
    //this.registrosSupervisores();
    this.submitted = false;
    this.registro = {};
    this.registroDialog = true;
    this.dropdownSupervisores = false;

    // Debe estar seleccionado el rol JEFE DE TURNO
    this.dropdownJefesTurno = false;
    this.dropdownSupervisores = false;
    this.dropdownTurnos = true;
    this.selectedRol = { rol_id: 3, descripcion: 'JEFE DE TURNO' };
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
        // INSERT

        // Verificar que rol esta seleccionado
        if (this.selectedRol.rol_id == 6) { this.id_usuario = Number(localStorage.getItem('id_usuario')); this.turnoAux = this.selectedTurno.descripcion; }
        if (this.selectedRol.rol_id == 5) { this.id_usuario = this.selectedSupervisor.id_usuario; this.turnoAux = ''; }
        if (this.selectedRol.rol_id == 4) { this.id_usuario = this.selectedJefeTurno.id_usuario; this.turnoAux = ''; }
        if (this.selectedRol.rol_id == 3) { this.id_usuario = Number(localStorage.getItem('id_usuario')); this.turnoAux = this.selectedTurno.descripcion; }

        // Llenar el body
        let body = {
          nombres: this.registro.nombres,                                                           // nombre
          pr_apellido: this.registro.pr_apellido,                                                   // pr_apellido
          sg_apellido: this.registro.sg_apellido !== undefined ? this.registro.sg_apellido : '',    // sg_apellido
          telefono: this.registro.telefono !== undefined ? this.registro.telefono : '',             // telefono
          rol_id: this.selectedRol.rol_id,                                                          // rol_id
          id_usuario: this.id_usuario,                                                              // id_usuario
          id_creador: Number(localStorage.getItem('id_usuario')),                                   // id_creador (siempre es el usuario logueado)
          turnoAux: this.turnoAux,                                                                  // turnoAux es para los roles de "Técnico de Contingencia" y "Jefe de Turno"
          // para los demás roles se averigua hereda de su inmediato superior (BackEnd)
        }

        // Verificación y Registro
        this.usuariosService.registraUsuario(body).subscribe(
          (data2: any) => {
            this.registroDialog = false;
            this.registro = {};
            this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: data2.message, life: 2500 });
            this.registrosTabla();
          })
      }

      // this.registros = [...this.registros];
      //this.registroDialog = false;

    }

  };


  deleteSelectedRegistro(registro: any) {
    this.registro = { ...registro };

    this.confirmationService.confirm({
      message: '¿Está seguro de <strong>ELIMINAR</strong> a: <strong>' + this.registro.nombre_completo + '</strong>?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.usuariosService.deleteUsuario({ id: this.registro.id_usuario, user: localStorage.getItem("login") }).subscribe(result => {

          this.registrosTabla();

          // Mensaje
          this.messageService.add({ severity: 'success', summary: 'Mensaje: ', detail: '¡Registro Eliminado!' });
          setTimeout(() => {
            this.messageService.clear();
          }, 2000);

        });
      },
    });
  }


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
