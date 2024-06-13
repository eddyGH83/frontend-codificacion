import { Component, OnInit } from '@angular/core';
import { AsignacionService } from '../service/asignacion.service';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Message } from 'primeng/api';


@Component({
  selector: 'app-asignacion',
  templateUrl: './carga-codificador.component.html',
  styleUrls: ['./carga-codificador.component.scss']
})
export class CargaCodificadorComponent implements OnInit {

  departamentos: any;
  selectedDepartamento: any;

  // selectedCustomer1: any;
  // registros: any;

  tabla_pb: boolean = false;

  // Dialogs
  asignacionDialog: boolean = false;
  reAsignacionDialog: boolean = false;

  registros: any;
  registro: any;

  usuarios: any; // codificadores
  usuarios2: any; // codificadores con carga

  // check
  checkedTodo: boolean = false;
  checked: boolean = false;

  // msgService asignacion
  msgService: boolean = false;
  titleMsgError: string = '';
  msgServiceAsig: boolean = false;
  titleMsgErrorAsig: string = 'Ocurrio un error al reasignar la carga';

  // msgService reasignacion
  msgServiceReAsig: boolean = false;
  titleMsgErrorReAsig: string = '';



  // total carga asignada
  total_carga_asignado: number = 0;

  //
  array_asg: Array<any> = [];
  array_reasig: Array<any> = [];

  constructor(private messageService: MessageService, private asignacionService: AsignacionService) { }

  ngOnInit(): void {

    /* this.asignacion=[
      {check:false, nombre: "Juan Perez", cantidad: 2},
      {check:false, nombre: "Carla Ponce", cantidad: 2},
    ] */
    this.registros = []

    this.departamentos = [
      { label: 'Chuquisaca', value: 'CHUQUISACA' },
      { label: 'La Paz', value: 'LA PAZ' },
      { label: 'Cochabamba', value: 'COCHABAMBA' },
      { label: 'Oruro', value: 'ORURO' },
      { label: 'Potosí', value: 'POTOSI' },
      { label: 'Tarija', value: 'TARIJA' },
      { label: 'Santa Cruz', value: 'SANTA CRUZ' },
      { label: 'Beni', value: 'BENI' },
      { label: 'Pando', value: 'PANDO' },
      { label: 'Otros', value: 'OTROS' }
    ];

    this.selectedDepartamento = { label: 'Oruro', value: 'ORURO' };
    this.registrosTabla();

    this.dividirTotal();
  }


  // ACTUALIZA REGISTROS DE LA TABLA
  registrosTabla() {
    this.tabla_pb = true;
    this.asignacionService.preguntasPorDepartamentoCod({ depto: this.selectedDepartamento?.value }).subscribe(res => {
      this.registros = res.datos.rows;
      this.tabla_pb = false;
      //this.registros = res;
      //console.log(res.datos.rows)
    });
  }


  // SELECCIONA TODOS LOS CHECK
  seleccionarTodo() {
    if (this.checkedTodo !== false) {
      // todos check seleccionados
      this.checkedTodo = true;
      for (let i = 0; i < this.usuarios.length; i++) {
        this.usuarios[i].activo = true;
      }
      this.dividirTotal();
    } else {
      // todos check deseleccionados
      this.checkedTodo = false;
      for (let i = 0; i < this.usuarios.length; i++) {
        this.usuarios[i].activo = false;
      }

      // el valo de this.registros.total tiene que ser  0;
      for (let i = 0; i < this.usuarios.length; i++) {
        this.usuarios[i].total = 0;
      }
      this.dividirTotal();
    }
  }



  // DIVIDE EL TOTAL ENTRE LOS CODIFICADORES SELECCIONADOS
  dividirTotal() {

    for (let i = 0; i < this.usuarios.length; i++) {
      this.usuarios[i].total = 0;
    }

    let total = this.registro.total_carga;

    // cantidad es el total de los  this.usuarios[i].activo = true;
    let cantidad = 0;
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].activo === true) {
        cantidad = cantidad + 1;
      }
    }

    let entero = Math.floor(total / cantidad);
    let resto = total % cantidad;

    // cuando this.usuarios[i].activo = true; se asigna el valor de entero en this.registros.total
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].activo === true) {
        this.usuarios[i].total = entero;
      }
    }
    // tambien se debe dividir el valor de resto en this.registros.total seleccionados
    let j = 0;
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].activo === true) {
        if (j < resto) {
          this.usuarios[i].total = this.usuarios[i].total + 1;
          j = j + 1;
        }
      }
    }

  }



  // 
  asignarCarga(registro: any) {
    this.codificadores();
    this.registro = { ...registro };
    this.asignacionDialog = true;
  }



  //
  reAsignarCarga(registro: any) {
    this.registro = { ...registro };
    this.codificadoresConCarga();
    this.reAsignacionDialog = true;
  }


  codificadores() {
    this.asignacionService.codificadores(localStorage.getItem('id_usuario')).subscribe(res => {
      this.usuarios = res.datos.rows;
      this.checkedTodo = false;
    });
  }


  codificadoresConCarga() {
    this.asignacionService.codificadoresConCarga({
      id: localStorage.getItem('id_usuario'),
      tabla_id: this.registro.tabla_id,
      departamento: this.selectedDepartamento.value
    }).subscribe(res => {
      this.usuarios2 = res.datos;
      this.total_carga_asignado = res.total_carga_asignado;
    });
  }

  // guardar reasignacion (REVISAR ESTA PARTE GENERADA POR CPLT)
  guardarReAsignacion() {

    // sacamos el todal de usuarios2 de las cargas asignadas
    let total_aux = 0;
    for (let i = 0; i < this.usuarios2.length; i++) {
      total_aux = total_aux + Number(this.usuarios2[i].carga_asignado);
    }

    // verificamos que total_carga_asignado sea menor o igual a this.registro.total_carga
    if (total_aux > this.total_carga_asignado) {
      this.msgServiceReAsig = true;
      this.titleMsgErrorReAsig = "La carga reasignada supera el total de la carga asignada";
      setTimeout(() => { this.msgServiceReAsig = false; this.titleMsgErrorReAsig = ''; }, 3000);
      return;
    }

    this.array_reasig = [];

    // recorremos this.usuarios2 y creamos el array para enviar a la api
    for (let j in this.usuarios2) {
      const body = {
        departamento: this.selectedDepartamento.value,
        carga_asignado: this.usuarios2[j].carga_asignado,
        usucre: this.usuarios2[j].login
      }
      this.array_reasig.push(body)
    }

    // enviamos el array a la api
    this.asignacionService.updateReAsignado(this.registro.tabla_id, this.array_reasig).subscribe(res => {
      if (res.success === true) {
        this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: res.message, life: 2500 });
        this.reAsignacionDialog = false;
        this.registrosTabla();
      }
    });

  }




  resetCantAsignado(reg: any) {
    // buscar en this.usuarios2 el usuario con id_usuario = reg.id_usuario
    // asignar 0 al total de ese usuario
    for (let i = 0; i < this.usuarios2.length; i++) {
      if (this.usuarios2[i].id_usuario === reg.id_usuario) {
        this.usuarios2[i].carga_asignado = 0;
      }
    }
  }

  guardar() {
    this.array_asg = [];

    for (let j in this.usuarios) {
      if (this.usuarios[j].total > 0) {
        const body = {
          departamento: this.selectedDepartamento.value, //this.codificacionService.depto,
          count: this.usuarios[j].total,
          estado: 'ASIGNADO',
          usucre: this.usuarios[j].login,
          area: 'AREA AQUI' // this.codificacionService.area1
        }
        this.array_asg.push(body)
      }
    }


    this.asignacionService.updateAsignado(this.registro.tabla_id, this.array_asg,).subscribe(res => {
      // this.asignacionDialog = false;


      if (res.success === true) {
        this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: res.message, life: 2500 });
        this.asignacionDialog = false;
        this.registrosTabla();
      }


      if (res.success === false) {
        // Mensaje de error
        this.msgService = true;
        this.titleMsgError = res.message;
        setTimeout(() => {
          this.msgService = false;
          this.titleMsgError = '';
        }, 2500);
      }


    });

  }











  /*  this.asignacionService.updateAsignado('49-51', this.array_asg).subscribe( res => {
      this.asignacionDialog = false;
      this.registrosTabla();       
    }, error=> console.error(error)) */



}
