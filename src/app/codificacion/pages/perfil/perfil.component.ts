import { Component, OnInit } from '@angular/core';
import { PerfilService } from './service/perfil.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

    // Datos Usuario
    nombres: any;
    //apellidos: any;
    pr_apellido: any;
    sg_apellido: any;
    rol_id: any;
    login: any;
    rol_codigo: any;
    id_usuario: any;
    rol_descripcion: any;
    telefono: string ='';

    // Modificar Pass 
    passActual: any = '';
    passNuevo: any = '';
    passNuevo2: any = '';

    // msg
    msgError: boolean = false;
    msgSuccess: boolean = false;
    msgErrorCel: boolean = false;
    msgSuccessCel: boolean = false;

    // text
    textError: string = '';
    textSuccess: string = '';
    textErrorCel: string = '';
    textSuccessCel: string = '';

    constructor(private perfilService: PerfilService) { }


    ngOnInit(): void {
        //datosUsuario();
        this.actualizarDatosPerifl();
    }

    actualizarDatosPerifl() {

        this.perfilService.mostrarDatosUsuario({ id_usuario: localStorage.getItem('id_usuario') }).subscribe(
            (data2: any) => {
                console.log("dsfsdfsdfsf");
                this.nombres = data2.datos.rows[0].nombres;
                //this.apellidos = data2.datos.rows[0].apellidos;
                this.pr_apellido = data2.datos.rows[0].pr_apellido;
                this.sg_apellido = data2.datos.rows[0].sg_apellido;
                this.rol_id = data2.datos.rows[0].rol_id;
                this.login = data2.datos.rows[0].login;
                this.rol_codigo = data2.datos.rows[0].rol_codigo;
                this.id_usuario = data2.datos.rows[0].id_usuario;
                this.rol_descripcion = data2.datos.rows[0].rol_descripcion;
                this.telefono = data2.datos.rows[0].telefono;
            })
    }


    // Actualizar Nro Celular
    actualizaNroCel() {

        this.perfilService.actualizaNroCelular({ telefono: this.telefono, id_usuario: localStorage.getItem('id_usuario') }).subscribe(
            (data2: any) => {
                if (data2.success == true) {
                    this.textSuccessCel = data2.message;
                    this.msgSuccessCel = true;
                    this.msgErrorCel = false;
                    setTimeout(() => {
                        this.msgSuccessCel = false;
                        this.msgErrorCel = false;
                    }, 4000);

                    this.actualizarDatosPerifl();
                } else {
                    this.textErrorCel = data2.message;
                    this.msgSuccessCel = false;
                    this.msgErrorCel = true;
                    setTimeout(() => {
                        this.msgSuccessCel = false;
                        this.msgErrorCel = false;
                    }, 4000);
                }               
            })
    }


    // Modificar Pass
    modificarPassword() {
        this.perfilService.modificarPass({ passActual: this.passActual, passNuevo: this.passNuevo, passNuevo2: this.passNuevo2, id_usuario: localStorage.getItem('id_usuario') }).subscribe(
            (data2: any) => {
                if (data2.success == true) {
                    this.textSuccess = data2.message;
                    this.msgSuccess = true;
                    this.msgError = false;
                    setTimeout(() => {
                        this.msgSuccess = false;
                        this.msgError = false;
                    }, 4000);
                    this.passActual = '';
                    this.passNuevo = '';
                    this.passNuevo2 = '';
                } else {
                    this.textError = data2.message;
                    this.msgSuccess = false;
                    this.msgError = true;
                    setTimeout(() => {
                        this.msgSuccess = false;
                        this.msgError = false;
                    }, 4000);
                }
                this.actualizarDatosPerifl();
            })
    }

}
