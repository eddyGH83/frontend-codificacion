import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodificacionService } from '../service/codificacion.service';
import { MessageService } from 'primeng/api';

// Para el uso de HTML en el contexto
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-supervision-lote-doble',
  templateUrl: './supervision-lote-doble.component.html',
  styleUrls: ['./supervision-lote-doble.component.scss']
})
export class SupervisionLoteDobleComponent implements OnInit {



  registros: any;
  registro: any;
  selectedRegistros: any;


  contexto: any;


  // paginador
  rows: any;
  selectedRow: any;

  // Cantidad de registros seleccionados
  nroRegSelected: number = 0;



  // Dialog
  confirmacionDialog: boolean = false;
  confirmacionDialogError: boolean = false;


  // Progress Bar
  tabla_pb: boolean = false;


  // R E C O D I F I C A C I O N  -  D O B L E
  dialogRecodificacion: boolean = false;


  clasificacion_ocu_aux: any;
  clasificacion_act_aux: any;

  first_ocu: number = 0;
  first_act: number = 0;

  // Items
  departamentoOcuActItem: any;
  idPreguntaOcuActItem: any;
  secuencialOcuActItem: any;
  respuestaOcuItem: any;
  respuestaActItem: any;
  descripcionOcuItem: any;
  descripcionActItem: any;
  codigocodifOcuItem: any;
  codigocodifActItem: any;
  estadoOcuItem: any;
  estadoActItem: any;
  usucodificadorOcuItem: any;
  usucodificadorActItem: any;
  porRecodificar: number = 0;

  //
  contAux: number = 0;


  constructor(private sanitizer: DomSanitizer, private router: Router, private codificacionService: CodificacionService, private messageService: MessageService) { }



  ngOnInit(): void {



    this.rows = [
      { nro: 50, value: 50 },
      { nro: 100, value: 100 },
      { nro: 1000, value: 1000 },
    ];
    this.selectedRow = { nro: 50, value: 50 };

    this.registrosTabla();

  }


  // 
  registrosTabla() {
    this.tabla_pb = true;
    this.codificacionService.devuelveCargaParaSupervision({ id_usuario: localStorage.getItem('id_usuario'), tabla_id: localStorage.getItem("tabla_id_sup") }).subscribe(
      (data2: any) => {
        console.table(data2.datos);
        this.registros = data2.datos;
        this.tabla_pb = false;
      })
  }


  hideDialog() {
    this.confirmacionDialog = false;
  }

  hideDialogError() {
    this.confirmacionDialogError = false;
  }


  guardarSupervision() {
    // calcular el total de registros seleccionados si es undefined o null 
    if (this.selectedRegistros === undefined || this.selectedRegistros === null || this.selectedRegistros.length === 0) {
      this.nroRegSelected = 0;
      this.confirmacionDialogError = true;
    } else {
      this.nroRegSelected = this.selectedRegistros.length;
      this.confirmacionDialog = true;
    }

  }

  /*   recodificaicion() {
      alert('Recodificación');
      this.codificacionService.addItem({ id: 1, name: 'Recodificación', price: 10, category: 'Recodificación', review: 4, inventoryStatus: 'Out of Stock' });
      this.router.navigate(['/codificacion/supervision-individual-simple']);
    } */


  // Confirmar la supervisión
  confirmaSupervision() {
    this.codificacionService.updateCargaSupervision(
      {
        id_usuario: localStorage.getItem('login'),
        tabla_id: localStorage.getItem("tabla_id_sup"),
        registros: this.selectedRegistros
      }
    ).subscribe(
      (data2: any) => {
        this.confirmacionDialog = false;
        this.registrosTabla();
        this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: data2.message, life: 2500 });

        //this.tabla_pb = false;
        //this.registros = data2.datos;
      })
  }


  // 
  cancelarYsalir() {
    this.router.navigate(['/codificacion/supervisar-codificacion']);
  }




  //  R E C O D I F I C A C I O N 

  onDialogRecodificacionClose() {

  }

// primer reistro  de la lista de registros seleccionados
  primero() {
    this.departamentoOcuActItem = this.selectedRegistros[0].departamento;
    this.idPreguntaOcuActItem = this.selectedRegistros[0].id_registro
    this.secuencialOcuActItem = this.selectedRegistros[0].secuencial
    this.respuestaOcuItem = this.selectedRegistros[0].respuesta_ocu
    this.respuestaActItem = this.selectedRegistros[0].respuesta_act
    this.descripcionOcuItem = this.selectedRegistros[0].descripcion_ocu
    this.descripcionActItem = this.selectedRegistros[0].descripcion_act
    this.codigocodifOcuItem = this.selectedRegistros[0].codigocodif_ocu
    this.codigocodifActItem = this.selectedRegistros[0].codigocodif_act
    this.estadoOcuItem = this.selectedRegistros[0].estado_ocu
    this.estadoActItem = this.selectedRegistros[0].estado_act
    this.usucodificadorOcuItem = this.selectedRegistros[0].usucodificador_ocu
    this.usucodificadorActItem = this.selectedRegistros[0].usucodificador_act
    this.contAux = 0;
  }

// siuiente registro de la lista de registros seleccionados
  siguiente() {
    this.contAux++;
    if (this.contAux < this.selectedRegistros.length) {
      this.departamentoOcuActItem = this.selectedRegistros[this.contAux].departamento;
      this.idPreguntaOcuActItem = this.selectedRegistros[this.contAux].id_registro
      this.secuencialOcuActItem = this.selectedRegistros[this.contAux].secuencial
      this.respuestaOcuItem = this.selectedRegistros[this.contAux].respuesta_ocu
      this.respuestaActItem = this.selectedRegistros[this.contAux].respuesta_act
      this.descripcionOcuItem = this.selectedRegistros[this.contAux].descripcion_ocu
      this.descripcionActItem = this.selectedRegistros[this.contAux].descripcion_act
      this.codigocodifOcuItem = this.selectedRegistros[this.contAux].codigocodif_ocu
      this.codigocodifActItem = this.selectedRegistros[this.contAux].codigocodif_act
      this.estadoOcuItem = this.selectedRegistros[this.contAux].estado_ocu
      this.estadoActItem = this.selectedRegistros[this.contAux].estado_act
      this.usucodificadorOcuItem = this.selectedRegistros[this.contAux].usucodificador_ocu
      this.usucodificadorActItem = this.selectedRegistros[this.contAux].usucodificador_act
    }else {
      this.messageService.add({ severity: 'error', summary: 'Mensaje:', detail: 'Es el último registro', life: 1500 });
    }
    

  }


  confirmarSupervisionCorrecto() { }


  recodificaicion() {
    this.primero();
    this.dialogRecodificacion = true;
  }




}
