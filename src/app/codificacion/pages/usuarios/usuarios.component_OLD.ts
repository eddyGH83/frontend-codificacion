import { Component, OnInit } from '@angular/core';
import { ProductoserviciosService } from '../../service/productoservicios.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuariosService } from './services/usuarios.service';



@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    providers: [MessageService, ConfirmationService]
})
export class UsuariosComponent implements OnInit {


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
    //reasignarDialog
    reasignarDialog: boolean;

    // submitted
    submitted: boolean;

    // msg
    nomUsuExistente: boolean = false;

    // roles
    roles: any;
    selectedRol: any;

    // supervisores
    supervisores: any;
    selectedSupervisor: any;

    // turnos
    turnos: any;
    selectedTurno: any;

    // 
    catalogos: any;
    selectedCatalogo: any;
    selectedCustomer1: any;

    // botones acciones
    btnEditar: boolean = false;
    btnEliminar: boolean = false;
    btnResetPass: boolean = false;
    btnReasignar: boolean = false;

    // dropdowns
    dropdownRoles: boolean = false;
    dropdownSupervisores: boolean = false;
    dropdownTurnos: boolean = false;

    //
    msgUserExit: boolean = false;



    constructor(private productService: ProductoserviciosService, private messageService: MessageService, private confirmationService: ConfirmationService, private usuariosService: UsuariosService) { }

    ngOnInit(): void {

        this.registros = [];
        this.supervisores = [];
        this.selectedSupervisor = {};

        this.turnos = [
            { turno: 'MAÑANA', descripcion: 'MAÑANA' },
            { turno: 'TARDE', descripcion: 'TARDE' }
        ];
        this.selectedTurno = { turno: 'MAÑANA', descripcion: 'MAÑANA' };

        this.validarRol();
        this.registrosTabla();
        
    }



    validarRol() {

        // Admin del Sistema
        if (localStorage.getItem("rol_id") == "1") {
            this.roles = [
                { rol_id: 1, descripcion: 'ADMINISTRADOR DEL SISTEMA' },
                { rol_id: 2, descripcion: 'RESPONSABLE ESPECIALISTA DE CODIFICACIÓN' },
                { rol_id: 3, descripcion: 'JEFE DE TURNO' },
                { rol_id: 4, descripcion: 'SUPERVISOR DE CODIFICACIÓN' },
                { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' },
                { rol_id: 6, descripcion: 'TÉCNICO DE CONTINGENCIA' }
            ];
            this.selectedRol = { rol_id: 1, descripcion: 'ADMINISTRADOR DEL SISTEMA' };
        }

        // Esp/Resp de Codificación
        if (localStorage.getItem("rol_id") == "2") {
            this.roles = [
                { rol_id: 3, descripcion: 'JEFE DE TURNO' },
                { rol_id: 4, descripcion: 'SUPERVISOR DE CODIFICACIÓN' },
                { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' },
                { rol_id: 6, descripcion: 'TÉCNICO DE CONTINGENCIA' }
            ];
            this.selectedRol = { rol_id: 3, descripcion: 'JEFE DE TURNO' };
            //
            this.btnEditar = false;
            this.btnEliminar = false; //true;
            this.btnResetPass = false;
            this.btnReasignar = false;
        }

        // Jefe de Turno
        if (localStorage.getItem("rol_id") == "3") {
            this.roles = [
                { rol_id: 4, descripcion: 'SUPERVISOR DE CODIFICACIÓN' },
                { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' },
                { rol_id: 6, descripcion: 'TÉCNICO DE CONTINGENCIA' }
            ];
            this.selectedRol = { rol_id: 4, descripcion: 'SUPERVISOR DE CODIFICACIÓN' };

            //
            this.btnEditar = false;
            this.btnEliminar = false; //true;
            this.btnResetPass = false;
            this.btnReasignar = false;
        }

        // Supervisor de Codificación
        if (localStorage.getItem("rol_id") == "4") {

            this.roles = [
                { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' }
            ];
            this.selectedRol = { rol_id: 5, descripcion: 'TÉCNICO EN CODIFICACIÓN' };

            //
            this.btnEditar = false;
            this.btnEliminar = true; //true;
            this.btnResetPass = false;
            this.btnReasignar = false;
        }

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




    // + Nuevo
    opcionesRol() {
        // Tecnico de Contingencia
        if (this.selectedRol.rol_id == 6) {
            this.dropdownSupervisores = false;
            this.dropdownTurnos = false;
        }
        // Técnico en Codificación
        if (this.selectedRol.rol_id == 5) {
            this.dropdownSupervisores = true;
            this.dropdownTurnos = false;
        }
        // Supervisor de Codificación
        if (this.selectedRol.rol_id == 4) {
            this.dropdownSupervisores = false;
            this.dropdownTurnos = true;
        }
        // Jefe de Turno
        if (this.selectedRol.rol_id == 3) {
            this.dropdownSupervisores = false;
            this.dropdownTurnos = true;
        }
    }



    openNew() {
        this.registrosSupervisores();
        this.validarRol();

        this.submitted = false;
        this.registro = {};

        // supervisores
        if (localStorage.getItem("rol_id") == '4') {
            this.dropdownRoles = true;
            this.dropdownSupervisores = false;
            this.dropdownTurnos = false;
        } else {
            this.dropdownRoles = true;
            this.dropdownSupervisores = false;
            this.dropdownTurnos = true;
        };

        // dialog
        this.registroDialog = true;
    }




    editRegistro(registro: any) {
      this.registrosSupervisores();

        // contingencia
        if (registro.rol_id == 6) {
            this.dropdownRoles = true;
            this.dropdownSupervisores = false;
            this.dropdownTurnos = false;

            this.selectedRol = { rol_id: registro.rol_id, descripcion: registro.rol_descripcion };
            this.selectedTurno = { turno: registro.turno, descripcion: registro.turno };
        }

        // Tecnico codificacion
        if (registro.rol_id == 5) {
            this.dropdownRoles = true;
            this.dropdownSupervisores = true;
            this.dropdownTurnos = false;

            this.selectedRol = { rol_id: registro.rol_id, descripcion: registro.rol_descripcion };
            this.selectedSupervisor = this.supervisores.find((x: any) => x.id_usuario == registro.cod_supvsr);
        }

        // Supervisor
        if (registro.rol_id == 4) {
            this.dropdownRoles = true;
            this.dropdownSupervisores = false;
            this.dropdownTurnos = true;

            this.selectedRol = { rol_id: registro.rol_id, descripcion: registro.rol_descripcion };
            this.selectedTurno = { turno: registro.turno, descripcion: registro.turno };
        }

        // Jefe de Turno
        if (registro.rol_id == 3) {
            this.dropdownRoles = true;
            this.dropdownSupervisores = false;
            this.dropdownTurnos = true;

            this.selectedRol = { rol_id: registro.rol_id, descripcion: registro.rol_descripcion }; ////////////////////
            this.selectedTurno = { turno: registro.turno, descripcion: registro.turno };
        }

        this.registro = { ...registro };

        // this.selectedRol = { value: registro.rol_id, txt: registro.rol_descripcion };
        // this.selectedTurno = { value: registro.turno, txt: registro.turno };
        this.registroDialog = true;
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


    /* 
    const body={
          nombres : this.miFormulario.value.nombres,
          apellidos: this.miFormulario.value.apellidos,
          login: this.miFormulario.value.username,
          telefono: this.miFormulario.value.telefono,
          rol_id: this.miFormulario.value.rol,
          usucre: localStorage.getItem('login'),
          turno: this.miFormulario.value.rol==5 ? this.miFormulario.value.turnos : null,
          cod_supvsr: supervisor,
          //id_usuario: this.selectedUser.id_usuario
        }
     */

    saveRegistro() {

        this.submitted = true;

        if (this.registro.nombres.trim() && this.registro.apellidos.trim() && this.registro.login.trim()) {

            if (this.registro.id_usuario) {
                alert("UPDATE");
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });



            } else {

                let body = {
                    nombres: this.registro.nombres,
                    apellidos: this.registro.apellidos,
                    login: this.registro.login,
                    telefono: this.registro.telefono !== ''? this.registro.telefono : '',
                    rol_id: this.selectedRol.rol_id,
                    usucre: localStorage.getItem('login'),
                    turno: null,// this.selectedRol.rol_id == 3 || this.selectedRol.rol_id == 4 ||this.selectedRol.rol_id == 6 ? this.selectedTurno.descripcion : null,
                    cod_supvsr: null// Number(localStorage.getItem('rol_id')) == 4 ? Number(localStorage.getItem('id_usuario')) : this.selectedSupervisor.id_usuario,
                }

                // turno
                if (this.selectedRol.rol_id == 3 || this.selectedRol.rol_id == 4 ||this.selectedRol.rol_id == 6) {
                    body.turno =this.selectedTurno.descripcion;
                }

                // cod_supvsr
                if (Number( localStorage.getItem('rol_id')) == 4) {
                    body.cod_supvsr= Number(localStorage.getItem('id_usuario'))
                }
                if (Number( localStorage.getItem('rol_id')) == 3 || Number(localStorage.getItem('rol_id')) == 2){
                    body.cod_supvsr= this.selectedSupervisor.id_usuario;
                }


                // Verificación y Registro
                this.usuariosService.registraUsuario(body).subscribe(
                    (data2: any) => {

                        if (data2.success) {

                            this.registroDialog = false;
                            this.registro = {};

                            // Mensaje
                            this.messageService.add({ severity: 'success', summary: 'Mensaje: ', detail: data2.message });
                            setTimeout(() => {
                                this.messageService.clear();
                            }, 2000);

                        } else {

                            // Mensaje
                            this.msgUserExit = true;
                            setTimeout(() => {
                                this.msgUserExit = false;
                            }, 5000);

                        }

                        this.registrosTabla();

                    })


                //alert("ADD");



                /* 
                  registraUsuario(body: any): Observable<any> {
                    return this.httpClient.post(`${base_url}/usuarios/registraUsuario`, body)
                  }
                */

                /* this.usuariosService.registraUsuario({
                  nombres : this.registro.nombres,
                  apellidos: this.registro.apellidos,
                  login: this.registro.login,
                  telefono: this.registro.telefono,
                  rol_id: this.miFormulario.value.rol,
                  usucre: localStorage.getItem('login'),
                  turno: this.miFormulario.value.rol==5 ? this.miFormulario.value.turnos : null,
                  cod_supvsr: supervisor,
                }).subscribe(
                  (data2: any) => {
                    //console.log("data2", data2.datos);
                    this.tabla_pb = false;
                    this.registros = data2.datos.rows;
                  }) */

                this.registrosTabla();
            }

            // this.registros = [...this.registros];
            //this.registroDialog = false;
           
        }

        // this.registroDialog = false;
        //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        //this.MessageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    };




}
