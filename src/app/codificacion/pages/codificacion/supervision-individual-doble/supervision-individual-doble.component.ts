import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CodificacionService } from '../service/codificacion.service';

import { Router } from '@angular/router';

// Para el uso de HTML en el contexto
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as similarity from 'similarity';

@Component({
  selector: 'app-supervision-individual-doble',
  templateUrl: './supervision-individual-doble.component.html',
  styleUrls: ['./supervision-individual-doble.component.scss']
})
export class SupervisionIndividualDobleComponent implements OnInit {


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
  codigocodifItem_ocu: any;
  codigocodifItem_act: any;
  usucodificadorItem_ocu: any;
  usucodificadorItem_act: any;
  porCodificar_act: number = 0;
  porCodificar_ocu: number = 0;
  descripcionItem_ocu: string = '';
  descripcionItem_act: string = '';
  nAux: number = 0;



  // Para las buquedas
  cod_ocu: string = '';
  desc_ocu: string = '';
  cod_act: string = '';
  desc_act: string = '';


  // paginador
  first_ocu = 0;
  first_act = 0;




  // Progress Bar
  ocuActCont_pb: boolean = false; // Progress Bar de los controles de ocupacion y actividad y contexto
  catOcu_pb: boolean = false; // Progress Bar de los catalogos de ocupacion
  catAct_pb: boolean = false; // Progress Bar de los catalogos de actividad

  // El servicio "private sanitizer: DomSanitizer" es para poder usar HTML en el contexto
  constructor(private router: Router, private sanitizer: DomSanitizer, private messageService: MessageService, private codificacionService: CodificacionService, private confirmationService: ConfirmationService) { }


  ngOnInit(): void {

    this.cargarParaSupervision();

  }

  // CARGA PARA SUPERVISION
  cargarParaSupervision() {

    // Progres bar
    this.ocuActCont_pb = true;

    const body = {
      tabla_id: localStorage.getItem('tabla_id_sup'),
      id_usuario: localStorage.getItem('id_usuario'),
      login: localStorage.getItem('login'),
    }

    this.codificacionService.cargarParaSupervisionDoble(body).subscribe(
      (data2: any) => {
        console.table(data2.datos);
        

        this.totalCarga = data2.totalCarga;           // Total carga ocupacion y actividad
        this.totalCarga_ocu = data2.totalCarga_ocu;   // Total carga ocupacion
        this.totalCarga_act = data2.totalCarga_act;   // Total carga actividad
        this.nroPreg_ocu = data2.nroPreg_ocu;   // nro de la pregunta acupacion
        this.nroPreg_act = data2.nroPreg_act;   // nro de la pregunta actividad
        this.descPreg_ocu = data2.descPreg_ocu; // descripcion de la pregunta ocupacion 
        this.descPreg_act = data2.descPreg_act; // descripcion de la pregunta actividad
        this.carga = data2.datos;               // datos de la carga
        this.clasificacion_ocu = data2.clasificacion_ocu;   // clasificacion ocupacion (catalogo ocupacion)
        this.clasificacion_act = data2.clasificacion_act;   // clasificacion actividad (catalogo actividad)
        this.porCodificar_ocu = data2.totalCarga;
        this.porCodificar_act = data2.totalCarga;

        this.primero();
        this.buscarSimilares();

        // Progres bar
        this.ocuActCont_pb = false;
      })
  }


  /* 
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
  */


  /* 
    <strong>OCUPACION</strong> <br>
          <strong>Codigo: </strong> ${this.codigocodifItem_ocu} 
          <strong>Descripción: </strong> ${this.descripcionItem_ocu} <br>        
          <strong>Usuario: </strong> ${this.usucodificadorItem_ocu} <br> <br>


  
          <strong>ACTIVIDAD</strong> <br>
          <strong>Codigo: </strong> ${this.codigocodifItem_act} 
          <strong>Descripción: </strong> ${this.descripcionItem_act} <br>
          <strong>Usuario: </strong> ${this.usucodificadorItem_act} <br>
  */

  // Confirmar supervision [correcto]
  confirmarSupervisionCorrecto() {
    this.confirmationService.confirm({
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
    });
  }







  // Confirmar supervision [ok]  [ok] 
  confirmarSupervision() {

  }


  // Confirmar codificacion
  confirmarCodificacionOcuAct() {
    // Verificar que codigocodifItem_ocu y codigocodifItem_act no esten vacios
    if (this.codigocodifItem_ocu == null || this.codigocodifItem_act == null) {

      this.confirmationService.confirm({
        message: `
          <strong>Error::</strong> No se puede guardar la codificación si no se ha codificado la ocupación o la actividad. 
        `,
        header: 'Confirmación',
        icon: 'pi pi-check-square',
        accept: () => {
        }
      });

    } else {

      this.confirmationService.confirm({
        message: `
          <strong>OCUPACION</strong> <br>
          <strong>Codigo: </strong> ${this.codigocodifItem_ocu} 
          <strong>Descripción: </strong> ${this.descripcionItem_ocu} <br>        
          <strong>Usuario: </strong> ${this.usucodificadorItem_ocu} <br> <br>


  
          <strong>ACTIVIDAD</strong> <br>
          <strong>Codigo: </strong> ${this.codigocodifItem_act} 
          <strong>Descripción: </strong> ${this.descripcionItem_act} <br>
          <strong>Usuario: </strong> ${this.usucodificadorItem_act} <br>
        `,
        header: 'Confirmación',
        icon: 'pi pi-check-square',
        accept: () => {
          const body = {
            id_registro: this.idPregunta,	// id por el cual se modifica
            codigocodifOcu: this.codigocodifItem_ocu,	// codigo de codificacion
            usucodificadorOcu: this.usucodificadorItem_ocu,	// usuario que codifica
            codigocodifAct: this.codigocodifItem_act,	// codigo de codificacion
            usucodificadorAct: this.usucodificadorItem_act,	// usuario que codifica
          }

          this.codificacionService.updatePreguntaDobleOcuAct(body).subscribe(
            (data2: any) => {

              //
              if (data2.success) {
                // verica si por codficar  de act y ocu es 0, redirecciona a la pagina /codificacion
                if (this.porCodificar_ocu == 0 && this.porCodificar_act == 0) {
                  this.router.navigate(['/codificacion']);
                }

                // mensaje
                this.messageService.add({ severity: 'success', summary: 'success', detail: data2.message });


                // paginador
                this.first_ocu = 0;
                this.first_act = 0;

                // contador
                this.porCodificar_ocu--;
                this.porCodificar_act--;


                // Modificar: carga (foreach) su propiedad estado_ocu = 'CODIFICADO'
                this.carga.forEach(element => {
                  if (element.id_p49_p51 == this.idPregunta) {
                    element.estado_ocu = 'CODIFICADO';
                    element.codigocodif_ocu = this.codigocodifItem_ocu;
                    element.usucodificador_ocu = this.usucodificadorItem_ocu;
                    element.estado_act = 'CODIFICADO';
                    element.codigocodif_act = this.codigocodifItem_act;
                    element.usucodificador_act = this.usucodificadorItem_act;
                  }
                });


                this.siguiente();
              } else {
                this.messageService.add({ severity: 'error', summary: 'error', detail: data2.message });
                this.ngOnInit();
              }

            })

        }
      });

    }

  }



  // Codificar ocupacion
  codificarOcu(registro: any) {
    // Modificar datos actuales
    this.estadoItem_ocu = 'CODIFICADO';
    this.codigocodifItem_ocu = registro.codigo;
    this.usucodificadorItem_ocu = localStorage.getItem('login');
    this.descripcionItem_ocu = registro.descripcion;
  }


  // Codificar actividad
  codificarAct(registro: any) {
    // Modificar datos actuales
    this.estadoItem_act = 'CODIFICADO';
    this.codigocodifItem_act = registro.codigo;
    this.usucodificadorItem_act = localStorage.getItem('login');
    this.descripcionItem_act = registro.descripcion;

  }




  // BUSCAR registros por el input descripcion en clasificacion_ocu
  buscarPorDescripcionOcu() {
    // paginador
    this.first_ocu = 0;


    // Limpiar clasificacion_ocu_aux
    this.clasificacion_ocu_aux = [];

    // Limpiar input cod_ocu
    this.cod_ocu = '';

    // recoorer clasificacion_ocu
    this.clasificacion_ocu.forEach(element => {
      // La descripcion debe ser igual al input descripcion de izquierda a derecha sin importar mayusculas, minusculas y acentos
      if (element.descripcion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(this.desc_ocu.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        // agregar a clasificacion_ocu_aux
        this.clasificacion_ocu_aux.push(element);
      }
    });

    // ordenar de forma descendente por el tamaño de caracteres
    this.clasificacion_ocu_aux.sort((a, b) => (a.descripcion.length > b.descripcion.length) ? 1 : -1);

    // si el descripcion no existe en la clasificacion limipar clasificacion_ocu_aux
    if (this.desc_ocu == '') {
      this.clasificacion_ocu_aux = [];
    }
  }

  // BUSCAR registros por el input descripcion en clasificacion_act
  buscarPorDescripcionAct() {
    // paginador
    this.first_act = 0;


    // Limpiar clasificacion_act_aux
    this.clasificacion_act_aux = [];

    // Limpiar input cod_act
    this.cod_act = '';

    // recoorer clasificacion_act
    this.clasificacion_act.forEach(element => {
      // La descripcion debe ser igual al input descripcion de izquierda a derecha sin importar mayusculas, minusculas y acentos
      if (element.descripcion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(this.desc_act.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        // agregar a clasificacion_act_aux
        this.clasificacion_act_aux.push(element);
      }

    });

    // ordenar de forma descendente por el tamaño de caracteres
    this.clasificacion_act_aux.sort((a, b) => (a.descripcion.length > b.descripcion.length) ? 1 : -1);

    // si el descripcion no existe en la clasificacion limipar clasificacion_act_aux
    if (this.desc_act == '') {
      this.clasificacion_act_aux = [];
    }
  }



  // BUSCAR registros por el input codigo en clasificacion_ocu
  buscarPorCodigoOcu() {
    // paginador
    this.first_ocu = 0;


    // alert("dfsdsdfsdfsfdsfsdfs")
    // Limpiar clasificacion_ocu_aux
    this.clasificacion_ocu_aux = [];

    // Limpiar input desc_ocu
    this.desc_ocu = '';

    // recoorer clasificacion_ocu
    this.clasificacion_ocu.forEach(element => {
      // El codigo debe ser igual al input codigo de izquierda a derecha
      if (element.codigo.startsWith(this.cod_ocu)) {
        // agregar a clasificacion_ocu_aux
        this.clasificacion_ocu_aux.push(element);
      }
    });

    // ordenar de forma ascendente por el tamaño de caracteres
    //this.clasificacion_ocu_aux.sort((a, b) => (a.descripcion.length > b.descripcion.length) ? 1 : -1);



    // this.cod_ocu == '' limpiar clasificacion_ocu_aux
    if (this.cod_ocu == '') {
      this.clasificacion_ocu_aux = [];
    }
  }



  // BUSAR registros por el input codigo en clasificacion_act
  buscarPorCodigoAct() {
    // paginador
    this.first_act = 0;

    // Limpiar clasificacion_act_aux
    this.clasificacion_act_aux = [];

    // Limpiar input desc_act
    this.desc_act = '';

    // recoorer clasificacion_act
    this.clasificacion_act.forEach(element => {

      // El codigo debe ser igual al input estrictamente  en tamaño de caracteres
      if (element.codigo.startsWith(this.cod_act)) {
        // agregar a clasificacion_act_aux
        this.clasificacion_act_aux.push(element);
      }

    });

    // ordenar de forma descendente por el tamaño de caracteres
    // this.clasificacion_act_aux.sort((a, b) => (a.descripcion.length > b.descripcion.length) ? 1 : -1);

    // this.cod_act == '' limpiar clasificacion_act_aux
    if (this.cod_act == '') {
      this.clasificacion_act_aux = [];
    }
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



  // Debe ir al primer registro, sin importar el estado
  primero() {
    this.nAux = 0;
    this.contexto = this.sanitizer.bypassSecurityTrustHtml(this.carga[this.nAux].contexto);
    this.departamentoItem = this.carga[this.nAux].departamento;
    this.idPregunta = this.carga[this.nAux].id_p49_p51;
    this.secuencial = this.carga[this.nAux].secuencial;
    this.respuestaItem_ocu = this.carga[this.nAux].respuesta_ocu;
    this.respuestaItem_act = this.carga[this.nAux].respuesta_act;
    this.estadoItem_ocu = this.carga[this.nAux].estado_ocu;
    this.estadoItem_act = this.carga[this.nAux].estado_act;
    this.codigocodifItem_ocu = this.carga[this.nAux].codigocodif_ocu;
    this.codigocodifItem_act = this.carga[this.nAux].codigocodif_act;
    this.usucodificadorItem_ocu = this.carga[this.nAux].usucodificador_ocu;
    this.usucodificadorItem_act = this.carga[this.nAux].usucodificador_act;
    this.descripcionItem_ocu = this.carga[this.nAux].descripcion_ocu;
    this.descripcionItem_act =  this.carga[this.nAux].descripcion_act;

    //  Reeplazar el input desc_ocu y desc_act por el valor de la respuesta
    this.desc_ocu = this.respuestaItem_ocu;
    this.desc_act = this.respuestaItem_act;

    // Limpia el input cod_ocu y cod_act
    this.cod_ocu = '';
    this.cod_act = '';

    this.buscarSimilares();
  }



  // REcorre la carga hacia el siguiente registro, sin importar el estado_ocu = 'CODIFICADO' o estado_act = 'CODIFICADO'
  siguiente() {
    this.nAux++;
    if (this.nAux < this.totalCarga) {
      this.contexto = this.sanitizer.bypassSecurityTrustHtml(this.carga[this.nAux].contexto);
      this.departamentoItem = this.carga[this.nAux].departamento;
      this.idPregunta = this.carga[this.nAux].id_p49_p51;
      this.secuencial = this.carga[this.nAux].secuencial;
      this.respuestaItem_ocu = this.carga[this.nAux].respuesta_ocu;
      this.respuestaItem_act = this.carga[this.nAux].respuesta_act;
      this.estadoItem_ocu = this.carga[this.nAux].estado_ocu;
      this.estadoItem_act = this.carga[this.nAux].estado_act;
      this.codigocodifItem_ocu = this.carga[this.nAux].codigocodif_ocu;
      this.codigocodifItem_act = this.carga[this.nAux].codigocodif_act;
      this.usucodificadorItem_ocu = this.carga[this.nAux].usucodificador_ocu;
      this.usucodificadorItem_act = this.carga[this.nAux].usucodificador_act;
      this.descripcionItem_ocu = this.carga[this.nAux].descripcion_ocu;
      this.descripcionItem_act = this.carga[this.nAux].descripcion_act;
      //this.nAux++;
    }

    //  Reeplazar el input desc_ocu y desc_act por el valor de la respuesta
    this.desc_ocu = this.respuestaItem_ocu;
    this.desc_act = this.respuestaItem_act;

    // Limpia el input cod_ocu y cod_act
    this.cod_ocu = '';
    this.cod_act = '';

    this.buscarSimilares();
  }





}
