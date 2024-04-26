import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asignacion',
  templateUrl: './carga-codificador.component.html',
  styleUrls: ['./carga-codificador.component.scss']
})
export class CargaCodificadorComponent implements OnInit {

  departamentos: any;
  selectedDepartamento: any;

  selectedCustomer1: any;
  registros: any;

  tabla_pb: boolean = false;
  asignacionDialog: boolean = false;


  asignacion: any;

  // check
  checkeTodo: boolean = false;
  checked: boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.asignacion=[
      {check:false, nombre: "Juan Perez", cantidad: 2},
      {check:false, nombre: "Carla Ponce", cantidad: 2},
    ]

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
    ];
    this.selectedDepartamento = { label: 'La Paz', value: 'LA PAZ' };

    this.registros=[
      {
        depto: "LA PAZ",
        nroPreg: "20",
        variable: "Alguna persona que vivía con usted(es) en este hogar, ¿actualmente vive en otro país?",
        totalCarga:45

      },
      {
        depto: "LA PAZ",
        nroPreg: "32",
        variable: "¿Se autoidentifica con alguna nación, pueblo indígena originario campesino o afroboliviano?",
        totalCarga:23
      },
      {
        depto: "LA PAZ",
        nroPreg: "33",
        variable: "Idioma 1",
        totalCarga:0
      },
      {
        depto: "LA PAZ",
        nroPreg: "33",
        variable: "Idioma 2",
        totalCarga:21
      },
      {
        depto: "LA PAZ",
        nroPreg: "33",
        variable: "Idioma 3",
        totalCarga:92
      },
      {
        depto: "LA PAZ",
        nroPreg: "34",
        variable: "¿Cuál es el primer idioma o lengua en el que aprendió a hablar en su niñez?",
        totalCarga:12
      },
      {
        depto: "LA PAZ",
        nroPreg: "35",
        variable: "¿Dónde nació?",
        totalCarga: 0
      },
      {
        depto: "LA PAZ",
        nroPreg: "36",
        variable: "¿Dónde vive habitualmente?",
        totalCarga:27
      },
      {
        depto: "LA PAZ",
        nroPreg: "37",
        variable: "¿Dónde vivía el año 2019?",
        totalCarga:12
      },
      {
        depto: "LA PAZ",
        nroPreg: "48",
        variable: "Las últimas 4 semanas:",
        totalCarga:42
      },
      {
        depto: "LA PAZ",
        nroPreg: "49-51",
        variable: "Ocupación - Actividad Económica",
        totalCarga:62
      },
      {
        depto: "LA PAZ",
        nroPreg: "52",
        variable: "Principalmente, el lugar donde trabaja está ubicado:",
        totalCarga:82
      },
    ]

  }

  registrosTabla(){
  }

  seleccionarTodo(){
    if (this.checkeTodo == false) {
      this.checkeTodo = true;
      for (let i = 0; i < this.asignacion.length; i++) {
        this.asignacion[i].check = true;
      }      
    }else{
      this.checkeTodo = false;
      for (let i = 0; i < this.asignacion.length; i++) {
        this.asignacion[i].check = false;
      }      
    }    
  }

  asignarCarga(){
    // Listar los codificadores
    
    this.asignacionDialog = true;   
  }

}
