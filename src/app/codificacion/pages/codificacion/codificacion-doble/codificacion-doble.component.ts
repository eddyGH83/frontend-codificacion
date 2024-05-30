import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CodificacionService } from '../service/codificacion.service';



@Component({
  selector: 'app-codificacion-doble',
  templateUrl: './codificacion-doble.component.html',
  styleUrls: ['./codificacion-doble.component.scss']
})
export class CodificacionDobleComponent implements OnInit {

  // registros
  registros: any;
  registro: any;

  // Progress Bar
  tabla_pb: boolean = false;



  selectedRegistros: any;


  msgs: any = [];


  // registroDialog
  registroDialog: boolean;


  // submitted
  submitted: boolean;

  // Busqueda
  busqueda: any;
  customers1: any;
  //customers2: Customer[];

  selectedCustomer1: any;
  selectedCustomer2: any;


  // catalogos  
  catalogos: any;
  selectedCatalogo: any;


  //
  products: any;




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
  clasificacion_ocu_aux: [] = [];
  clasificacion_act_aux: [] = [];



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



  constructor(private messageService: MessageService, private codificacionService: CodificacionService, private confirmationService: ConfirmationService) { }


  ngOnInit(): void {



    this.products = [
      { depto: 'depto', identificador: '0-0', porCodificar: 0 }
    ];

    this.selectedCatalogo = { label: 'La Paz', value: 'LA PAZ' };

    // this.show();  
    this.registros = [
      {
        nroPreg: "20",
        variable: "520520",
        total: "Tomina"

      },
      {
        nroPreg: "32",
        variable: "145020",
        total: "Tomina"
      },
      {
        nroPreg: "33",
        variable: "050204",
        total: "Tomave"
      },
      {
        nroPreg: "34",
        variable: "400157",
        total: "Toco"
      },
      {
        nroPreg: "35",
        variable: "600250",
        total: "Toro Toro"
      },
      {
        nroPreg: "36",
        variable: "652305",
        total: "Santo Tomé"
      },
      {
        nroPreg: "37",
        variable: "152004",
        total: "Togo"
      },
      {
        nroPreg: "48",
        variable: "605077",
        total: "Tomino"
      },
      {
        nroPreg: "49-51",
        variable: "909050",
        total: "Tomeave"
      },
      {
        nroPreg: "52",
        variable: "101210",
        total: "Tomena"
      },
    ];

    this.cargaParaCodificar();

  }


  // carga para codificar
  cargaParaCodificar() {
    const body = {
      tabla_id: localStorage.getItem('tabla_id'),
      id_usuario: localStorage.getItem('id_usuario'),
      login: localStorage.getItem('login'),
    }

    this.codificacionService.cargarParaCodificarDoble(body).subscribe(
      (data2: any) => {
        this.totalCarga = data2.totalCarga,
          this.totalCarga_ocu = data2.totalCarga_ocu,
          this.totalCarga_act = data2.totalCarga_act,
          this.nroPreg_ocu = data2.nroPreg_ocu,
          this.nroPreg_act = data2.nroPreg_act,
          this.descPreg_ocu = data2.descPreg_ocu,
          this.descPreg_act = data2.descPreg_act,
          this.carga = data2.datos,
          this.clasificacion_ocu = data2.clasificacion_ocu,
          this.clasificacion_act = data2.clasificacion_act

        this.primero();
      })

  }

  // recorre la carga adelante
  siguiente() {
    if (this.nAux < this.totalCarga) {
      this.contexto = this.carga[this.nAux].contexto;
      this.departamentoItem = this.carga[this.nAux].departamento;
      this.idPregunta = this.carga[this.nAux].id_p49_p51;
      this.secuencial = this.carga[this.nAux].secuencial;
      this.respuestaItem_ocu = this.carga[this.nAux].respuesta_ocu;
      this.respuestaItem_act = this.carga[this.nAux].respuesta_act;
      this.estadoItem_ocu = this.carga[this.nAux].estado_ocu;
      this.estadoItem_act = this.carga[this.nAux].estado_act;

      // inputs de busqueda      
      this.desc_ocu = this.respuestaItem_ocu;
      this.desc_act = this.respuestaItem_act;

      this.buscarSimilares(this.desc_ocu, this.desc_act);


      this.nAux++;
    }
  }


  // recorre la carga atras
  anterior() {
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

      // inputs de busqueda      
      this.desc_ocu = this.respuestaItem_ocu;
      this.desc_act = this.respuestaItem_act;

      this.buscarSimilares(this.desc_ocu, this.desc_act);

    }
  }


  // primero de la carga
  primero() {
    this.contexto = this.carga[0].contexto;
    this.departamentoItem = this.carga[0].departamento;
    this.idPregunta = this.carga[0].id_p49_p51;
    this.secuencial = this.carga[0].secuencial;
    this.respuestaItem_ocu = this.carga[0].respuesta_ocu;
    this.respuestaItem_act = this.carga[0].respuesta_act;
    this.estadoItem_ocu = this.carga[0].estado_ocu;
    this.estadoItem_act = this.carga[0].estado_act;

    // inputs de busqueda
    this.desc_ocu = this.respuestaItem_ocu;
    this.desc_act = this.respuestaItem_act;

    this.buscarSimilares(this.desc_ocu, this.desc_act);

    this.nAux = 1;
  }


  // Funcion que buscar palabras similares   
  buscarSimilares(ocu: any, act: any) {
    console.log("buscarSimilares", ocu, act);
    
    // Buscar palabras similares con el metodo includes en clasificacion_ocu y clasificacion_act y guardarlas en clasificacion_ocu_aux y clasificacion_act_aux
    this.clasificacion_ocu_aux = this.clasificacion_ocu;  // .clasificacion_ocu.filter((element: any) => element.descripcion.includes(ocu));
    this.clasificacion_act_aux = this.clasificacion_act;  // .clasificacion_act.filter((element: any) => element.descripcion.includes(act));



    //this.clasificacion_ocu_aux = this.clasificacion_ocu;
    //this.clasificacion_act_aux = this.clasificacion_act;

  }


  // Confirmar codificación de Ocupación
  confirmarCodificacionOcu(registro: any) {

    // Datos que se enviaran al backend
    var body = {
      login: localStorage.getItem('login'),
      id_p49_p51: this.idPregunta, // Por este campo se hace la actualización
      codigo: registro.codigo,
      descripcion: registro.descripcion,
      variable: 'ocu' // Se hara la actualización en las columnas de ocupación
    }

    this.confirmationService.confirm({
      message: '<strong>CODIGO:</strong> ' + registro.codigo + '<br><strong> DESCRIPCIÓN: </strong>' + registro.descripcion,
      header: 'Confirmación',
      icon: 'pi pi-check',
      accept: () => {
        // Actualizar (codificar)                         
        this.codificacionService.updateOcuAct(body).subscribe(
          (data2: any) => {
            // Mensaje  
            this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: 'Codificación exitosa (ocupación).', life: 2500 });
            //this.primero();
          })

        // Modificar: this.totalCarga_ocu siempre y cuando estado_ocu = 'ASIGNADO'
        if (this.estadoItem_ocu == 'ASIGNADO') {
          this.totalCarga_ocu = this.totalCarga_ocu - 1;
        }

        // Modificar: this.estadoItem_ocu
        this.estadoItem_ocu = 'CODIFICADO';



        // Modificar: carga su propiedad estado_ocu = 'CODIFICADO'
        this.carga.forEach(element => {
          if (element.id_p49_p51 == this.idPregunta) {
            element.estado_ocu = 'CODIFICADO';
          }
        });
      }
    });
  }



  // Confirmar codificación de Actividad
  confirmarCodificacionAct(registro: any) {

    // Datos que se enviaran al backend
    var body = {
      login: localStorage.getItem('login'),
      id_p49_p51: this.idPregunta, // Por este campo se hace la actualización
      codigo: registro.codigo,
      descripcion: registro.descripcion,
      variable: 'act' // Se hara la actualización en las columnas de actividad
    }

    this.confirmationService.confirm({
      message: '<strong>CODIGO:</strong> ' + registro.codigo + '<br><strong> DESCRIPCIÓN: </strong>' + registro.descripcion,
      header: 'Confirmación',
      icon: 'pi pi-check',
      accept: () => {
        // Actualizar (codificar)
        this.codificacionService.updateOcuAct(body).subscribe(
          (data2: any) => {
            // Mensaje  
            this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: 'Codificación exitosa (actividad).', life: 2500 });
            //this.primero();
          })


        // Modificar: this.totalCarga_act siempre y cuando estado_act = 'ASIGNADO'
        if (this.estadoItem_act == 'ASIGNADO') {
          this.totalCarga_act = this.totalCarga_act - 1;
        }

        // Modificar: this.estadoItem_act
        this.estadoItem_act = 'CODIFICADO';


        // Modificar: carga su propiedad estado_act = 'CODIFICADO'
        this.carga.forEach(element => {
          if (element.id_p49_p51 == this.idPregunta) {
            element.estado_act = 'CODIFICADO';
          }
        });
      }
    });
  }


  // Anular codificación anterior
  anularCodificacionAnterior() {
    // 
    // this.anterior();

    this.confirmationService.confirm({
      message: '¿Estás seguro de anular la anterior codificación?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Recorrer la carga atras
        this.anterior();
        // Datos que se enviaran al backend

        var body = {
          // login: localStorage.getItem('login'),
          id_p49_p51: this.idPregunta, // Por este campo se hace la actualización      
        }
        console.info(this.idPregunta);


        // Modificar: this.totalCarga_ocu siempre y cuando estado_ocu = 'ASIGNADO'
        if (this.estadoItem_ocu == 'CODIFICADO') {
          this.totalCarga_ocu = this.totalCarga_ocu + 1;
          this.estadoItem_ocu = 'ASIGNADO';
          // Modificar: carga su propiedad estado_ocu = 'ASIGNADO'
          this.carga.forEach(element => {
            if (element.id_p49_p51 == this.idPregunta) {
              element.estado_ocu = 'ASIGNADO';
            }
          });
        }


        // Modificar: this.totalCarga_act siempre y cuando estado_act = 'ASIGNADO'
        if (this.estadoItem_act == 'CODIFICADO') {
          this.totalCarga_act = this.totalCarga_act + 1;
          this.estadoItem_act = 'ASIGNADO';
          // Modificar: carga su propiedad estado_act = 'CODIFICADO'
          this.carga.forEach(element => {
            if (element.id_p49_p51 == this.idPregunta) {
              element.estado_act = 'ASIGNADO';
            }
          });
        }

      }
    });
  }







  openNew() {
    // alert("openNew");
    // this.product = {};
    this.submitted = false;
    // this.productDialog = true;
    this.registro = {};
    this.registroDialog = true;
  }

  hideDialog() {
    this.registroDialog = false;
    this.submitted = false;
  }


  // Tabla detalle
  registrosTabla() {
    this.tabla_pb = true;
    this.codificacionService.devuelveCatalogo({ catalogo: this.selectedCatalogo.value }).subscribe(
      (data2: any) => {
        //console.log("data2", data2.datos);
        this.tabla_pb = false;
        this.registros = [] // data2.datos.rows;
      })
  }


  saveRegistro() {
    this.submitted = true;

    if (
      this.registro.codigo.trim() && this.registro.descripcion.trim()) {

      if (this.registro.id_catalogo) {
        // UPDATE

        // this.diccionariosService.validarRegistros(body).subscribe( res => {
        /* 
        const body = {
      codigo: this.miFormulario.value.codigo,
      descripcion: this.miFormulario.value.descripcion,
      catalogo: this.catalogo,
    }
        */

        this.codificacionService.validarRegistros({ codigo: this.registro.codigo, descripcion: this.registro.descripcion, catalogo: this.selectedCatalogo.value }).subscribe(
          (data2: any) => {

            if (data2.datos.rows.length > 0) {
              // Mensaje 
              this.messageService.add({ severity: 'info', summary: 'Successful', detail: `El código: ${this.registro.codigo} y la descripción: ${this.registro.descripcion} ya existe!` });
              setTimeout(() => {
                this.messageService.clear();
              }, 2000);
            } else {

              // Mensaje
              this.messageService.add({ severity: 'info', summary: 'Successful', detail: 'Registro Modificado!' });
              setTimeout(() => {
                this.messageService.clear();
              }, 2000);

            }
          })



      } else {
        // ADD


        // Mensaje
        this.messageService.add({ severity: 'info', summary: 'Successful', detail: 'Registro Adicionado!' });
        setTimeout(() => {
          this.messageService.clear();
        }, 2000);
      }

      // this.products = [...this.products];
      this.registroDialog = false;
      // this.product = {};
    }
  };



  show() {
    this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks', life: 3000 });
  }

  // editRegistro(product: Product) {  
  editRegistro(registro: any) {
    this.registro = { ...registro };
    this.registroDialog = true;
  }

  hide() {
    this.msgs = [];
  }


  deleteSelectedRegistro(customer: any) {
    // alert("customer" + customer.id_catalogo);

    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar el registro seleccionado?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.codificacionService.updateEstadoCatalogo(customer.id_catalogo, { estado: 'INACTIVO', user: 1 }).subscribe(
          (data2: any) => {
            this.registrosTabla();
          })

        // Mensaje
        this.messageService.add({ severity: 'info', summary: 'Successful', detail: 'Registro Eliminado' });
        setTimeout(() => {
          this.messageService.clear();
        }, 2000);
      },
      //reject: () => {alert("REJECT");}
    });
  }


}
