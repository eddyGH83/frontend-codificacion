import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CodificacionService } from '../service/codificacion.service';
import { MessageService } from 'primeng/api';


import * as similarity from 'similarity';


// import { Product } from '../../domain/product';
// import { ProductService } from '../../service/productservice';
// import { ConfirmationService } from 'primeng/api';
// import { MessageService } from 'primeng/api';

// crear una interface para los Product
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  review: number;
  inventoryStatus: string;
}



@Component({
  selector: 'app-supervision-lote-simple',
  templateUrl: './supervision-lote-simple.component.html',
  styleUrls: ['./supervision-lote-simple.component.scss']
})
export class SupervisionLoteSimpleComponent implements OnInit {



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


  // Preguntas para supervisión
  preguntas: any = [
    { tabla_id: 'p20esp', nro_preg: 20, descripcion: '¿Alguna persona que vivía con usted(es) en este hogar, ¿actualmente vive en otro país?' },
    { tabla_id: 'p32esp', nro_preg: 32, descripcion: '¿Se autoidentifica con alguna nación, pueblo indígena originario campesino o afroboliviano?' },
    { tabla_id: 'p331', nro_preg: 33, descripcion: '¿Qué idiomas o lenguas habla?, según el mayor uso: idioma 1' },
    { tabla_id: 'p332', nro_preg: 33, descripcion: '¿Qué idiomas o lenguas habla?, según el mayor uso: idioma 2' },
    { tabla_id: 'p333', nro_preg: 33, descripcion: '¿Qué idiomas o lenguas habla?, según el mayor uso: idioma 3' },
    { tabla_id: 'p341', nro_preg: 34, descripcion: '¿Cuál es el primer idioma o lengua en el que aprendió a hablar en su niñez?' },
    { tabla_id: 'p352a', nro_preg: 35, descripcion: '¿Dónde nació? ¿Municipio?' },
    { tabla_id: 'p353', nro_preg: 35, descripcion: '¿Dónde nació? ¿País?' },
    { tabla_id: 'p362a', nro_preg: 36, descripcion: '¿Dónde vive habitualmente? ¿Municipio?' },
    { tabla_id: 'p363', nro_preg: 36, descripcion: '¿Dónde vive habitualmente? ¿País?' },
    { tabla_id: 'p372a', nro_preg: 37, descripcion: '¿Dónde vivía el año 2019? ¿Municipio?' },
    { tabla_id: 'p373', nro_preg: 37, descripcion: '¿Dónde vivía el año 2019? ¿País?' },
    { tabla_id: 'p48esp', nro_preg: 48, descripcion: 'Las últimas 4 semanas:' },
    { tabla_id: 'p49_p51', nro_preg: '49-51', descripcion: 'Ocupación - Actividad Económica' },
    { tabla_id: 'p52esp', nro_preg: 52, descripcion: 'Principalmente, el lugar donde trabaja está ubicado:' }
  ]

  preguntasSelected: any = {};

  // progresBar
  tabla1_pb: boolean = true;

  /* 
  * R E C O D I F I C A C I O N
  */
  dialogRecodificacion: boolean = false;

  clasificacionAux: any;

  first = 0;

  contAux: number = 0;

  //
  departamentoItem: any;
  idPreguntaItem: any;
  secuencialItem: any;
  respuestaItem: any;
  codigocodifItem: any;
  estadoItem: any;
  usucodificadorItem: any;
  porRecodificar: number = 0;

  // 
  catalogo: any;
  catalogoAux: any = [];

  // 
  codigo: any;
  respuesta: any;

  constructor(private router: Router, private codificacionService: CodificacionService, private messageService: MessageService) { }

  ngOnInit(): void {

    // busar las preguntas de la tabla_id
    this.preguntas.forEach((item: any) => {
      if (item.tabla_id === localStorage.getItem("tabla_id_sup")) {
        this.preguntasSelected = item;
      }
    });


    this.rows = [
      { nro: 10, value: 10 },
      { nro: 50, value: 50 },
      { nro: 100, value: 100 },
      { nro: 200, value: 200 },
      { nro: 500, value: 500 },
    ];
    this.selectedRow = { nro: 10, value: 10 };


    this.registrosTabla();

  }

  // 
  registrosTabla() {
    this.tabla1_pb = true;
    this.codificacionService.devuelveCargaParaSupervision({ id_usuario: localStorage.getItem('id_usuario'), tabla_id: localStorage.getItem("tabla_id_sup") }).subscribe(
      (data2: any) => {
        console.table(data2.datos);
        //console.table(data2.catalogo);

        this.registros = data2.datos;
        this.catalogo = data2.catalogo;
        this.tabla1_pb = false;
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






  /* 
  * R E C O D I F I C A C I O N
  */


  recodificaicion() {
    console.table(this.selectedRegistros);
    if (this.selectedRegistros === undefined || this.selectedRegistros === null || this.selectedRegistros.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Mensaje:', detail: 'No hay registros seleccionados para recodificar', life: 2500 });
    } else {
      this.primero();
      this.dialogRecodificacion = true;
      // porCodificar
      this.porRecodificar = this.selectedRegistros.length;
    }
  }







  // primer reistro  de la lista de registros seleccionados
  primero() {
    this.departamentoItem = this.selectedRegistros[0].departamento;
    this.idPreguntaItem = this.selectedRegistros[0].id_registro;
    this.secuencialItem = this.selectedRegistros[0].secuencial;
    this.respuestaItem = this.selectedRegistros[0].respuesta;
    this.codigocodifItem = this.selectedRegistros[0].codigocodif;
    this.estadoItem = this.selectedRegistros[0].estado;
    this.usucodificadorItem = this.selectedRegistros[0].usucodificador;
    this.contAux = 0;

    // 
    this.codigo = this.selectedRegistros[0].codigocodif;
    this.respuesta = this.selectedRegistros[0].respuesta;

    //
    this.buscarSimilares();
  }






  // siuiente registro de la lista de registros seleccionados
  siguiente() {
    this.contAux++;
    if (this.contAux < this.selectedRegistros.length) {
      this.departamentoItem = this.selectedRegistros[this.contAux].departamento;
      this.idPreguntaItem = this.selectedRegistros[this.contAux].id_registro;
      this.secuencialItem = this.selectedRegistros[this.contAux].secuencial;
      this.respuestaItem = this.selectedRegistros[this.contAux].respuesta;
      this.codigocodifItem = this.selectedRegistros[this.contAux].codigocodif;
      this.estadoItem = this.selectedRegistros[this.contAux].estado;
      this.usucodificadorItem = this.selectedRegistros[this.contAux].usucodificador;

      //
      this.codigo = this.selectedRegistros[this.contAux].codigocodif;
      this.respuesta = this.selectedRegistros[this.contAux].respuesta;

      //
      this.buscarSimilares();

    } else {
      this.messageService.add({ severity: 'error', summary: 'Mensaje:', detail: 'Es el último registro', life: 2500 });
    }
  }

  // Buscar palabras similares en 
  buscarSimilares() {
    // Paginador
    this.first = 0;

    // limpiar clasificacionAux
    this.clasificacionAux = [];
    // recorrer clasificacion
    this.catalogo.forEach(element => {
      // calcular la similitud           
      let sim = similarity(this.respuestaItem, element.descripcion);
      // si la similitud es mayor a 0.5
      if (sim > 0.5) {
        // agregar a clasificacionAux, tambien la similitud
        element.similitud = sim;
        this.catalogoAux.push(element);
      }
    });
    // ordenar por similitud
    this.catalogoAux.sort((a, b) => (a.similitud > b.similitud) ? -1 : 1);
  }





  // Buscar por codigo
  buscarPorCodigo() {
    alert('buscar por codigo');
  }


  // Buscar por respuesta
  buscarPorRespuesta() {
    // Paginador
    this.first = 0;

    // Limpiar clasificacionAux
    this.catalogoAux = [];

    // Limpiar input codigo
    this.codigo = '';

    // recorrer catalogo
    this.catalogo.forEach(element => {
      // La descripcion debe ser igual al input descripcion de izquierda a derecha sin importar mayusculas, minusculas y aceentos
      if (element.descripcion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").startsWith(this.respuesta.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        // agregar a clasificacionAux
        this.catalogoAux.push(element);
      }
    });

    // ordenar por descripcion, de menor a mayor en cuanto a la longitud caracteres de la descripcion
    this.catalogoAux.sort((a, b) => (a.descripcion.length > b.descripcion.length) ? 1 : -1);

    // si el codigo no existe en la clasificacion limipar clasificacionAux
    if (this.respuesta.length === 0) {
      this.catalogoAux = [];
    }
  }


  confirmarCodifiacionCorrecto() { }


  // cerrar el dialogo de recodificación (por todos los modos de cerrar el dialogo)
  onDialogRecodificacionClose() {
    // cerrar el dialogo de recodificación
    this.registrosTabla();
    // deselecciona los registros seleccionados
    this.selectedRegistros = [];
    // contador auxiliar
    this.contAux = 0;
  }

}
