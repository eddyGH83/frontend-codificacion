import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CodificacionService } from '../service/codificacion.service';

// Para el uso de HTML en el contexto
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as similarity from 'similarity';


@Component({
  selector: 'app-codificacion-doble',
  templateUrl: './codificacion-doble.component.html',
  styleUrls: ['./codificacion-doble.component.scss']
})
export class CodificacionDobleComponent implements OnInit {


  // Datos Carga
  totalCarga: any;
  totalCarga_ocu: any;
  totalCarga_act: any;
  nroPreg_ocu: any;
  nroPreg_act: any;
  descPreg_ocu: any;
  descPreg_act: any;
  carga: any;
  clasificacion_ocu: any;
  clasificacion_act: any;
  clasificacion_ocu_aux: any;
  clasificacion_act_aux: any;



  // Un registro de la carga
  contexto: any;
  departamentoItem: any;
  idPregunta: any; // x-y
  secuencial: any;  // x-y
  respuestaItem_ocu: any;
  respuestaItem_act: any;
  estadoItem_ocu: any;
  estadoItem_act: any;
  nAux: number = 0;



  // Para las buquedas
  cod_ocu: string = '';
  desc_ocu: string = '';
  cod_act: string = '';
  desc_act: string = '';


  // Progress Bar
  ocuActCont_pb: boolean = false; // Progress Bar de los controles de ocupacion y actividad y contexto
  catOcu_pb: boolean = false; // Progress Bar de los catalogos de ocupacion
  catAct_pb: boolean = false; // Progress Bar de los catalogos de actividad

  // El servicio "private sanitizer: DomSanitizer" es para poder usar HTML en el contexto
  constructor(private sanitizer: DomSanitizer, private messageService: MessageService, private codificacionService: CodificacionService, private confirmationService: ConfirmationService) { }


  ngOnInit(): void {

    this.cargarParaCodificar();
  }


  // CARGA PARA CODIFICAR
  cargarParaCodificar() {

    // Progres bar
    this.ocuActCont_pb = true;

    const body = {
      tabla_id: localStorage.getItem('tabla_id'),
      id_usuario: localStorage.getItem('id_usuario'),
      login: localStorage.getItem('login'),
    }

    this.codificacionService.cargarParaCodificarDoble(body).subscribe(
      (data2: any) => {

        this.totalCarga = data2.totalCarga,             // Total carga ocupacion y actividad
          this.totalCarga_ocu = data2.totalCarga_ocu,   // Total carga ocupacion
          this.totalCarga_act = data2.totalCarga_act,   // Total carga actividad
          this.nroPreg_ocu = data2.nroPreg_ocu,   // nro de la pregunta acupacion
          this.nroPreg_act = data2.nroPreg_act,   // nro de la pregunta actividad
          this.descPreg_ocu = data2.descPreg_ocu, // descripcion de la pregunta ocupacion 
          this.descPreg_act = data2.descPreg_act, // descripcion de la pregunta actividad
          this.carga = data2.datos,               // datos de la carga
          this.clasificacion_ocu = data2.clasificacion_ocu,   // clasificacion ocupacion (catalogo ocupacion)
          this.clasificacion_act = data2.clasificacion_act    // clasificacion actividad (catalogo actividad)

        this.primero();
        this.buscarSimilares();

        // Progres bar
        this.ocuActCont_pb = false;
      })
  }

  /* 
  // Confirmar codificación
  confirmarCodifiacion(registro: any) {
    this.confirmationService.confirm({
      message: '<strong>Codigo: </strong>' + registro.codigo + '<br><strong>Descripción: </strong>' + registro.descripcion,
      header: 'Confirmación',
      icon: 'pi pi-check-square',
      accept: () => {

        // sim y cuando sea mayor a 0 y que estado sea diferente de CODIFICADO
        if (this.porCodificar > 0 && this.estadoItem === 'ASIGNADO') {
          this.porCodificar--;
        }

        // Modificar el estado y
        this.estadoItem = 'CODIFICADO';

        // Modificar: carga (foreach) su propiedad estado_ocu = 'CODIFICADO'
        this.carga.forEach(element => {
          if (element.id_pregunta == this.idPregunta) {
            element.estado = 'CODIFICADO';
          }
        });

        // Codificación
        const body = {
          id_registro: this.idPregunta,
          tabla_id: localStorage.getItem('tabla_id'),
          codigocodif: registro.codigo,
          usucodificador: localStorage.getItem('login'),
        }

        this.codificacionService.updatePreguntaSimple(body).subscribe(
          (data2: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Codificación realizada' });
            this.siguiente();
          })
      }
    });
  }
  */



  confirmarCodificacionAct(registro: any){
    console.log('confirmarCodificacionAct');

    this.confirmationService.confirm({
      message: '<strong>Codigo: </strong>' + registro.codigo + '<br><strong>Descripción: </strong>' + registro.descripcion, 
      header: 'Confirmación',
      icon: 'pi pi-check-square',
      accept: () => {
        // 
      }
    });
    
  }


  confirmarCodificacionOcu( registro: any){
    console.log('confirmarCodificacionOcu');

    this.confirmationService.confirm({
      message: '<strong>Codigo: </strong>' + registro.codigo + '<br><strong>Descripción: </strong>' + registro.descripcion, 
      header: 'Confirmación',
      icon: 'pi pi-check-square',
      accept: () => {
        // 
      }
    });
    
  }


  // Buscar registros por el input codigo en clasificacion_ocu
  buscarPorCodigoOcu() {
    // Limpiar clasificacion_ocu_aux
    this.clasificacion_ocu_aux = [];

    // Limpiar input desc_ocu
    this.desc_ocu = '';

    // recoorer clasificacion_ocu
    this.clasificacion_ocu.forEach(element => {
      // si el codigo es igual al input cod_ocu
      if (element.codigo === this.cod_ocu) {
        // agregar a clasificacion_ocu_aux
        this.clasificacion_ocu_aux.push(element);
      }
    });
  }







  // Buscar registros por el input descripcion en clasificacion_ocu
  buscarPorDescripcionOcu() {
    // Limpiar clasificacion_ocu_aux
    this.clasificacion_ocu_aux = [];

    // Limpiar input cod_ocu
    this.cod_ocu = '';

    // recoorer clasificacion_ocu
    this.clasificacion_ocu.forEach(element => {
      // calcular la similitud
      let sim = similarity(this.desc_ocu, element.descripcion);
      // si la similitud es mayor a 0.5
      if (sim > 0.5) {
        // agregar a clasificacion_ocu_aux, tambien la similitud
        element.similitud = sim;
        this.clasificacion_ocu_aux.push(element);
      }

      // ordenar por similitud
      this.clasificacion_ocu_aux.sort((a, b) => (a.similitud > b.similitud) ? -1 : 1);
    });
  }






  // Buscar registros por el input codigo en clasificacion_act
  buscarPorCodigoAct() {
    // Limpiar clasificacion_act_aux
    this.clasificacion_act_aux = [];

    // Limpiar input desc_act
    this.desc_act = '';

    // recoorer clasificacion_act
    this.clasificacion_act.forEach(element => {
      // si el codigo es igual al input cod_act
      if (element.codigo === this.cod_act) {
        // agregar a clasificacion_act_aux
        this.clasificacion_act_aux.push(element);
      }
    });
  }






  // Buscar registros por el input descripcion en clasificacion_act
  buscarPorDescripcionAct() {
    // Limpiar clasificacion_act_aux
    this.clasificacion_act_aux = [];

    // Limpiar input cod_act
    this.cod_act = '';

    // recoorer clasificacion_act
    this.clasificacion_act.forEach(element => {
      // calcular la similitud
      let sim = similarity(this.desc_act, element.descripcion);
      // si la similitud es mayor a 0.5
      if (sim > 0.5) {
        // agregar a clasificacion_act_aux, tambien la similitud
        element.similitud = sim;
        this.clasificacion_act_aux.push(element);
      }

      // ordenar por similitud
      this.clasificacion_act_aux.sort((a, b) => (a.similitud > b.similitud) ? -1 : 1);
    });
  }






  // Buscar palabras similares en 
  buscarSimilares() {
    // Progres bar
    this.catOcu_pb = true;
    this.catAct_pb = true;

    // limpiar clasificacion_ocu_aux
    this.clasificacion_ocu_aux = [];
    // limpiar clasificacion_act_aux
    this.clasificacion_act_aux = [];


    // recorrer clasificacion ocupacion
    this.clasificacion_ocu.forEach(element => {
      // calcular la similitud           
      let sim = similarity(this.respuestaItem_ocu, element.descripcion);
      // si la similitud es mayor a 0.5
      if (sim > 0.5) {
        // agregar a clasificacion_ocu_aux, tambien la similitud
        element.similitud = sim;
        this.clasificacion_ocu_aux.push(element);
      }
    });

    // recorrer clasificacion actividad
    this.clasificacion_act.forEach(element => {
      // calcular la similitud           
      let sim = similarity(this.respuestaItem_act, element.descripcion);
      // si la similitud es mayor a 0.5
      if (sim > 0.5) {
        // agregar a clasificacion_act_aux, tambien la similitud
        element.similitud = sim;
        this.clasificacion_act_aux.push(element);
      }
    });

    // ordenar por similitud
    this.clasificacion_ocu_aux.sort((a, b) => (a.similitud > b.similitud) ? -1 : 1);
    this.clasificacion_act_aux.sort((a, b) => (a.similitud > b.similitud) ? -1 : 1);

    // Progres bar
    this.catOcu_pb = false;
    this.catAct_pb = false;
  }







  // 
  primero() {

    this.contexto = this.sanitizer.bypassSecurityTrustHtml(this.carga[0].contexto);
    this.departamentoItem = this.carga[0].departamento;     // el mismo para ocupacion y actividad
    this.idPregunta = this.carga[0].id_p49_p51;             // x-y (identificador de la pregunta)
    this.secuencial = this.carga[0].secuencial;             // x-y (identificador de la pregunta)
    this.respuestaItem_ocu = this.carga[0].respuesta_ocu;   // respuesta ocupacion
    this.respuestaItem_act = this.carga[0].respuesta_act;   // respuesta actividad
    this.estadoItem_ocu = this.carga[0].estado_ocu;         // estado ocupacion
    this.estadoItem_act = this.carga[0].estado_act;         // estado actividad


    //  Reeplazar el input desc_ocu y desc_act por el valor de la respuesta
    this.desc_ocu = this.respuestaItem_ocu;
    this.desc_act = this.respuestaItem_act;

    // Limpia el input cod_ocu y cod_act
    this.cod_ocu = '';
    this.cod_act = '';

    this.buscarSimilares();
  }





  // 
  atras() {
    if (this.nAux > 1) {
      this.nAux--;
      this.contexto = this.carga[this.nAux - 1].contexto;
      this.departamentoItem = this.carga[this.nAux - 1].departamento;
      this.idPregunta = this.carga[this.nAux - 1].id_p49_p51;
      this.secuencial = this.carga[this.nAux - 1].secuencial;
      this.respuestaItem_ocu = this.carga[this.nAux - 1].respuesta_ocu;
      this.respuestaItem_act = this.carga[this.nAux - 1].respuesta_act;
      this.estadoItem_ocu = this.carga[this.nAux - 1].estado_ocu;
      this.estadoItem_act = this.carga[this.nAux - 1].estado_act;
    }

    //  Reeplazar el input desc_ocu y desc_act por el valor de la respuesta
    this.desc_ocu = this.respuestaItem_ocu;
    this.desc_act = this.respuestaItem_act;

    // Limpia el input cod_ocu y cod_act
    this.cod_ocu = '';
    this.cod_act = '';

    this.buscarSimilares();
  }





  // 
  siguiente() {
    if (this.nAux < this.totalCarga) {
      this.contexto = this.sanitizer.bypassSecurityTrustHtml(this.carga[this.nAux].contexto);
      this.departamentoItem = this.carga[this.nAux].departamento;
      this.idPregunta = this.carga[this.nAux].id_p49_p51;
      this.secuencial = this.carga[this.nAux].secuencial;
      this.respuestaItem_ocu = this.carga[this.nAux].respuesta_ocu;
      this.respuestaItem_act = this.carga[this.nAux].respuesta_act;
      this.estadoItem_ocu = this.carga[this.nAux].estado_ocu;
      this.estadoItem_act = this.carga[this.nAux].estado_act;
      this.nAux++;
    }

    //  Reeplazar el input desc_ocu y desc_act por el valor de la respuesta
    this.desc_ocu = this.respuestaItem_ocu;
    this.desc_act = this.respuestaItem_act;

    // Limpia el input cod_ocu y cod_act
    this.cod_ocu = '';
    this.cod_act = '';

    this.buscarSimilares();
  }

  //
  // Recorre la carga hacia adelante
  anularAnterior() {
    // Volver atras un registro
    this.atras();
  }



}
