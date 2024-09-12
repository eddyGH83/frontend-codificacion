import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodificacionService } from '../service/codificacion.service';
import { ConfirmationService, MessageService } from 'primeng/api';



// Para el uso de HTML en el contexto
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as similarity from 'similarity';

@Component({
  selector: 'app-supervision-lote-doble-automatica',
  templateUrl: './supervision-lote-doble-automatica.component.html',
  styleUrls: ['./supervision-lote-doble-automatica.component.scss']
})
export class SupervisionLoteDobleAutomaticaComponent implements OnInit {


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

  // porCodificar_act
  porCodificarOcuAct: number = 0;

  //check
  checkedSelect: boolean = false;



  constructor(private confirmationService: ConfirmationService, private sanitizer: DomSanitizer, private router: Router, private codificacionService: CodificacionService, private messageService: MessageService) { }



  ngOnInit(): void {



    this.rows = [
      { nro: 50, value: 50 },
      { nro: 100, value: 100 },
      { nro: 500, value: 500 },
      { nro: 1000, value: 1000 },
    ];
    this.selectedRow = { nro: 50, value: 50 };

    this.registrosTabla();

  }


  // 
  registrosTabla() {
    this.tabla_pb = true;
    this.codificacionService.devuelveCargaParaSupervisionAutomatica({ 
      id_usuario: localStorage.getItem('id_usuario'), 
      tabla_id: localStorage.getItem("tabla_id_sup"),
      login: localStorage.getItem('login')
    }).subscribe(
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



  // Confirmar la supervisión::
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
        // this.registrosTabla();
        this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: data2.message, life: 2500 });

        // Elimiinar de registros los selectedRegistros
        this.registros = this.registros.filter(registro =>
          !this.selectedRegistros.includes(registro)
        );

        // Vaciar selectedRegistros
        this.selectedRegistros = [];


      })
  }


  // 
  cancelarYsalir() {
    this.router.navigate(['/codificacion/supervisar-codificacion-automatica']);
  }




  //  R E C O D I F I C A C I O N  





  borrarSeleccion() {
    this.selectedRegistros = [];
  }



  onDialogRecodificacionClose() {
    const selectedIds = new Set(this.selectedRegistros.map(reg => reg.id_registro));
    // Filtrar la lista de registros
    this.registros = this.registros.filter(registro =>
      // Conservar registros que no cumplan alguna de las condiciones
      !selectedIds.has(registro.id_registro) || // No está en selectedRegistros
      registro.estado_ocu !== 'VERIFICADO' || // estado_ocu no es 'VERIFICADO'
      registro.estado_act !== 'VERIFICADO' // estado_act no es 'VERIFICADO'
    );







    this.selectedRegistros = [];
    // contador auxiliar
    this.contAux = 0;

    // this.registros = this.registros.filter(element => !this.selectedRegistros.includes(element));


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
    this.confirmationService.confirm({
      message: `
          <strong>OCUPACION</strong> <br>
          <strong>Codigo: </strong> ${this.codigocodifOcuItem} <br>
          <strong>Descripción: </strong> ${this.descripcionOcuItem} <br>        
          <strong>Usuario: </strong> ${this.usucodificadorOcuItem} <br> <br>

          
          <strong>ACTIVIDAD</strong> <br>
          <strong>Codigo: </strong> ${this.codigocodifActItem} <br>
          <strong>Descripción: </strong> ${this.descripcionActItem} <br>
          <strong>Usuario: </strong> ${this.usucodificadorActItem} <br>
      `,
      header: 'Confirmación',
      icon: 'pi pi-check-square',
      accept: () => {


        this.codificacionService.updatePreguntaDobleCorreccion(
          {
            id_usuario: localStorage.getItem('login'),
            tabla_id: localStorage.getItem("tabla_id_sup"),
            id_registro: this.idPreguntaOcuActItem,
            codigocodifOcuItem: this.codigocodifOcuItem,
            codigocodifActItem: this.codigocodifActItem
          }
        ).subscribe(
          (data2: any) => {
            // Modificar: selectedRegistros (foreach) su propiedad estado_ocu = 'VERIFICADO' Y estado_act = 'VERIFICADO'
            this.selectedRegistros.forEach(element => {
              if (element.id_registro === this.idPreguntaOcuActItem) {
                element.estado_ocu = 'VERIFICADO';
                element.estado_act = 'VERIFICADO';
              }
            });

            // porRecodificar disminuye en 1, siempre y cuando sea mayor a 0
            if (this.porRecodificar > 0) {
              this.porRecodificar--;
            }

            // Si porRecodificar es igual a 0, cerrar el dialogo de recodificación
            if (this.porRecodificar === 0) {
              this.dialogRecodificacion = false;
            }

            // Mensaje de éxito
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data2.message });

            // eL Paginador se reinicia
            this.first_ocu = 0;
            this.first_act = 0;

            this.siguiente();

          })

      }
    });
  }


  // Codificar ocupacion
  codificarOcu(registro: any) {
    // Modificar datos actuales
    this.estadoOcuItem = 'CODIFICADO';
    this.codigocodifOcuItem = registro.codigo;
    this.usucodificadorOcuItem = localStorage.getItem('login');
    this.descripcionOcuItem = registro.descripcion;
  }


  // Codificar actividad
  codificarAct(registro: any) {
    // Modificar datos actuales
    this.estadoActItem = 'CODIFICADO';
    this.codigocodifActItem = registro.codigo;
    this.usucodificadorActItem = localStorage.getItem('login');
    this.descripcionActItem = registro.descripcion;

  }



  recodificacion() {
    if (this.tabla_pb) { return }

    if (this.selectedRegistros === undefined || this.selectedRegistros === null || this.selectedRegistros.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Mensaje:', detail: 'No hay registros seleccionados para recodificar', life: 2500 });
    } else {
      this.primero();
      this.dialogRecodificacion = true;
      // porCodificar
      this.porRecodificar = this.selectedRegistros.length;
    }

  }



  guardarSupervision() {
    if (this.tabla_pb) { return }

    // calcular el total de registros seleccionados si es undefined o null 
    if (this.selectedRegistros === undefined || this.selectedRegistros === null || this.selectedRegistros.length === 0) {
      this.selectedRegistros = [];
      this.messageService.add({ severity: 'error', summary: 'Mensaje:', detail: 'No hay registros seleccionados para guardar', life: 2500 });
    } else {
      this.nroRegSelected = this.selectedRegistros.length;
      this.confirmacionDialog = true;
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
