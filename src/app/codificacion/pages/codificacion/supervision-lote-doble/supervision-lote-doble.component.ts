import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodificacionService } from '../service/codificacion.service';
import { MessageService } from 'primeng/api';

// Para el uso de HTML en el contexto
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as similarity from 'similarity';

@Component({
  selector: 'app-supervision-lote-doble',
  templateUrl: './supervision-lote-doble.component.html',
  styleUrls: ['./supervision-lote-doble.component.scss']
})
export class SupervisionLoteDobleComponent implements OnInit {



  registros: any;
  registro: any;
  selectedRegistros: any;




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


  // Paginador
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
  contextoHtmlOcuActItem: any;

  // Catalogos
  catalogoOcu: any = [];
  catalogoAct: any = [];
  catalogoOcuAux: any = [];
  catalogoActAux: any = [];


  //
  contAux: number = 0;

  // Para las buquedas
  cod_ocu: string = '';
  desc_ocu: string = '';
  cod_act: string = '';
  desc_act: string = '';




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
        this.registros = data2.datos;
        this.catalogoOcu = data2.catalogo_ocu;
        this.catalogoAct = data2.catalogo_act;
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
    // cerrar el dialogo de recodificación
    this.registrosTabla();
    // deselecciona los registros seleccionados
    this.selectedRegistros = [];
    // contador auxiliar
    this.contAux = 0;
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
    this.contextoHtmlOcuActItem = this.sanitizer.bypassSecurityTrustHtml(this.selectedRegistros[0].contexto_html);
    this.contAux = 0;

    //
    this.cod_ocu = '';
    this.cod_act = '';
    this.desc_ocu = this.respuestaOcuItem;
    this.desc_act = this.respuestaActItem;

    //
    this.buscarSimilares();
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
      this.contextoHtmlOcuActItem = this.sanitizer.bypassSecurityTrustHtml(this.selectedRegistros[this.contAux].contexto_html);

      //
      this.cod_ocu = '';
      this.cod_act = '';
      this.desc_ocu = this.respuestaOcuItem;
      this.desc_act = this.respuestaActItem;

      //
      this.buscarSimilares();

    } else {
      this.messageService.add({ severity: 'error', summary: 'Mensaje:', detail: 'Es el último registro', life: 1500 });
    }


  }


  confirmarSupervisionCorrecto() {
  /*   this.confirmationService.confirm({
      message: `
          <strong>OCUPACION</strong> <br>
          <strong>Codigo: </strong> ${this.codigocodifItem_ocu} <br>
          <strong>Descripción: </strong> ${this.descripcionItem_ocu} <br>        
          <strong>Usuario: </strong> ${this.usucodificadorItem_ocu} <br> <br>

          
          <strong>ACTIVIDAD</strong> <br>
          <strong>Codigo: </strong> ${this.codigocodifItem_act} <br>
          <strong>Descripción: </strong> ${this.descripcionItem_act} <br>
          <strong>Usuario: </strong> ${this.usucodificadorItem_act} <br>
      `,
      header: 'Confirmación',
      icon: 'pi pi-check-square',
      accept: () => {


        this.codificacionService.updatePreguntaDobleCorreccion(
          {
            id_usuario: localStorage.getItem('login'),
            tabla_id: localStorage.getItem("tabla_id_sup"),
            id_registro: this.idPregunta,
          }
        ).subscribe(
          (data2: any) => {
            // Modificar: carga (foreach) su propiedad estado_ocu = 'VERIFICADO' Y estado_act = 'VERIFICADO'
            this.carga.forEach(element => {
              if (element.id_p49_p51 == this.idPregunta) {
                element.estado_ocu = 'VERIFICADO';
                element.estado_act = 'VERIFICADO';
              }
            });

            // Por codificar disminuye en 1, si   estadoItem_ocu === 'CODIFICADO' y estadoItem_act === 'CODIFICADO'
            if (this.porCodificar_ocu > 0 && this.porCodificar_act > 0) {
              this.porCodificar_ocu--;
              this.porCodificar_act--;
            }

            // si por codificar es igual a 0, redireccionar a la página de /codificacion/supervisar-codificacion
            if (this.porCodificar_ocu === 0 && this.porCodificar_act === 0) {
              this.router.navigate(['/codificacion/supervisar-codificacion']);
            }

            // Mensaje de éxito
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data2.message });

            // eL Paginador se reinicia
            this.first_ocu = 0;
            this.first_act = 0;

            this.siguiente();

          })
          
      }
    }); */
  }


  recodificaicion() {

    if (this.selectedRegistros === undefined || this.selectedRegistros === null || this.selectedRegistros.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Mensaje:', detail: 'No hay registros seleccionados para recodificar', life: 2500 });
    } else {
      this.primero();
      this.dialogRecodificacion = true;
      // porCodificar
      this.porRecodificar = this.selectedRegistros.length;
    }

  }




  buscarSimilares() {
    // Progres bar
    //this.catOcu_pb = true;
    //this.catAct_pb = true;


    // limpiar catalogoOcuAux
    this.catalogoOcuAux = [];
    // limpiar catalogoActAux
    this.catalogoActAux = [];


    // recorrer clasificacion ocupacion
    this.catalogoOcu.forEach(element => {
      // calcular la similitud           
      let sim = similarity(this.respuestaOcuItem, element.descripcion);
      // si la similitud es mayor a 0.5
      if (sim > 0.5) {
        // agregar a catalogoOcuAux, tambien la similitud
        element.similitud = sim;
        this.catalogoOcuAux.push(element);
      }
    });

    // recorrer clasificacion actividad
    this.catalogoAct.forEach(element => {
      // calcular la similitud           
      let sim = similarity(this.respuestaActItem, element.descripcion);
      // si la similitud es mayor a 0.5
      if (sim > 0.5) {
        // agregar a catalogoActAux, tambien la similitud
        element.similitud = sim;
        this.catalogoActAux.push(element);
      }
    });

    // ordenar por similitud
    this.catalogoOcuAux.sort((a, b) => (a.similitud > b.similitud) ? -1 : 1);
    this.catalogoActAux.sort((a, b) => (a.similitud > b.similitud) ? -1 : 1);

    // Progres bar
    //this.catOcu_pb = false;
    //this.catAct_pb = false;
  };





  // BUSCAR registros por el input descripcion en clasificacion_ocu
  buscarPorDescripcionOcu() {
    // paginador
    this.first_ocu = 0;


    // Limpiar catalogoOcuAux
    this.catalogoOcuAux = [];

    // Limpiar input cod_ocu
    this.cod_ocu = '';

    // recoorer catalogoOcu
    this.catalogoOcu.forEach(element => {
      // La descripcion debe ser igual al input descripcion de izquierda a derecha sin importar mayusculas, minusculas y acentos
      if (element.descripcion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(this.desc_ocu.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        // agregar a clasificacion_ocu_aux
        this.catalogoOcuAux.push(element);
      }
    });

    // ordenar de forma descendente por el tamaño de caracteres
    this.catalogoOcuAux.sort((a, b) => (a.descripcion.length > b.descripcion.length) ? 1 : -1);

    // si el descripcion no existe en la clasificacion limipar clasificacion_ocu_aux
    if (this.desc_ocu == '') {
      this.catalogoOcuAux = [];
    }
  }




  // BUSCAR registros por el input descripcion en clasificacion_act
  buscarPorDescripcionAct() {
    // paginador
    this.first_act = 0;


    // Limpiar catalogoActAux
    this.catalogoActAux = [];

    // Limpiar input cod_act
    this.cod_act = '';

    // recoorer clasificacion_act
    this.catalogoAct.forEach(element => {
      // La descripcion debe ser igual al input descripcion de izquierda a derecha sin importar mayusculas, minusculas y acentos
      if (element.descripcion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(this.desc_act.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        // agregar a catalogoActAux
        this.catalogoActAux.push(element);
      }

    });

    // ordenar de forma descendente por el tamaño de caracteres
    this.catalogoActAux.sort((a, b) => (a.descripcion.length > b.descripcion.length) ? 1 : -1);

    // si el descripcion no existe en la clasificacion limipar clasificacion_act_aux
    if (this.desc_act == '') {
      this.catalogoActAux = [];
    }
  }



  // BUSCAR registros por el input codigo en clasificacion_ocu
  buscarPorCodigoOcu() {
    // paginador
    this.first_ocu = 0;


    // Limpiar catalogoOcuAux
    this.catalogoOcuAux = [];

    // Limpiar input desc_ocu
    this.desc_ocu = '';

    // recoorer catalogoOcu
    this.catalogoOcu.forEach(element => {
      // El codigo debe ser igual al input codigo de izquierda a derecha
      if (element.codigo.startsWith(this.cod_ocu)) {
        // agregar a catalogoOcuAux
        this.catalogoOcuAux.push(element);
      }
    });

    // this.cod_ocu == '' limpiar catalogoOcuAux
    if (this.cod_ocu == '') {
      this.catalogoOcuAux = [];
    }
  }



  // BUSAR registros por el input codigo en clasificacion_act
  buscarPorCodigoAct() {
    // paginador
    this.first_act = 0;

    // Limpiar catalogoActAux
    this.catalogoActAux = [];

    // Limpiar input desc_act
    this.desc_act = '';

    // recoorer catalogoAct
    this.catalogoAct.forEach(element => {

      // El codigo debe ser igual al input estrictamente  en tamaño de caracteres
      if (element.codigo.startsWith(this.cod_act)) {
        // agregar a catalogoActAux
        this.catalogoActAux.push(element);
      }

    });

    // this.cod_act == '' limpiar catalogoActAux
    if (this.cod_act == '') {
      this.catalogoActAux = [];
    }
  }





}
