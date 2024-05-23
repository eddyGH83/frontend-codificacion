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


  // msgService
  msgService: boolean = false;
  titleMsgError: string = '';
  msgServiceAsig: boolean = true;
  titleMsgErrorAsig: string = 'Ocurrio un error al reasignar la carga';

  //
  array_asg: Array<any> = [];

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
    this.asignacionService.codificadoresConCarga({ id: localStorage.getItem('id_usuario'), pregunta: this.registro.tabla_id }).subscribe(res => {
      this.usuarios2 = res.datos;
      console.log("usuarios2");
      console.log(this.usuarios2);
    });
  }

  resetCantAsignado(reg: any) {
    // buscar en this.usuarios2 el usuario con id_usuario = reg.id_usuario
    // asignar 0 al total de ese usuario
    for (let i = 0; i < this.usuarios2.length; i++) {
      if (this.usuarios2[i].id_usuario === reg.id_usuario) {
        this.usuarios2[i].total_asignado = 0;
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



    // imprimir los registros de array_asg
    //console.table(this.array_asg);

    //alert("Asignado correctamente");


    this.asignacionService.updateAsignado(this.registro.tabla_id, this.array_asg,).subscribe(res => {
      // this.asignacionDialog = false;



      if (res.success === true) {
        //alert(res.message);        

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







  // guardar reasignacion (REVISAR ESTA PARTE GENERADA POR CPLT)
  guardarReAsignacion() {
    this.array_asg = [];

    for (let j in this.usuarios2) {
      if (this.usuarios2[j].total_asignado > 0) {
        const body = {
          departamento: 'DEPTO AQUI', //this.codificacionService.depto,
          count: this.usuarios2[j].total_asignado,
          estado: 'ASIGNADO',
          usucre: this.usuarios2[j].login,
          area: 'AREA AQUI' // this.codificacionService.area1
        }
        this.array_asg.push(body)
      }
    }

    //alert("Reasignado correctamente");
    this.asignacionService.updateAsignado(this.registro.tabla_id, this.array_asg).subscribe(res => {
      this.reAsignacionDialog = false;
      this.registrosTabla();
    });
  }





  /*  this.asignacionService.updateAsignado('49-51', this.array_asg).subscribe( res => {
      this.asignacionDialog = false;
      this.registrosTabla();       
    }, error=> console.error(error)) */



}
