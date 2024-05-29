import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CodificacionService } from '../service/codificacion.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-codificacion-simple',
  templateUrl: './codificacion-simple.component.html',
  styleUrls: ['./codificacion-simple.component.scss']
})
export class CodificacionSimpleComponent implements OnInit {

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
  carga: any;
  clasificacion: any;
  totalCarga: any;
  nroPreg: any;
  descPreg: any;

  // Un registro de la carga
  contexto: any;
  departamentoItem: any;
  idPregunta: any;
  secuencial: any;
  respuestaItem: any;
  estadoItem: any;
  nAux: number = 0;


  //vasfdf: string = localStorage.getItem('tabla_id');

  constructor(private router: Router, private messageService: MessageService, private codificacionService: CodificacionService, private confirmationService: ConfirmationService) { }


  ngOnInit(): void {

    // Verificamos que la variable tabla_id exista en localStorage
    if (localStorage.getItem('tabla_id') == null) {
      //Redireccionar a la página de codificación
      this.router.navigate(['/codificacion']);
    }



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

    //this.catalogosService.getCustomersMedium().then(data => this.customers1 = data);
    //this.catalogosService.getCustomersMedium().then(data => this.customers2 = data);

    //this.registrosTabla();


    this.cargarParaCodificar();
  }

  /*   openNew() {
      // alert("openNew");
      // this.product = {};
      this.submitted = false;
      // this.productDialog = true;
      this.registro = {};
      this.registroDialog = true;
    }
  */

  // carga para codificar
  cargarParaCodificar() {
    const body = {
      tabla_id: localStorage.getItem('tabla_id'),
      id_usuario: localStorage.getItem('id_usuario'),
      login: localStorage.getItem('login'),
    }

    this.codificacionService.cargarParaCodificar(body).subscribe(
      (data2: any) => {
        this.carga = data2.datos;
        this.clasificacion = data2.clasificacion;
        this.totalCarga = data2.totalCarga;
        this.nroPreg = data2.nroPreg;
        this.descPreg = data2.descPreg;
        this.primero();
      })

  }

  // recorre la carga
  siguiente() {
    if (this.nAux < this.totalCarga) {
      this.contexto = this.carga[this.nAux].contexto;
      this.departamentoItem = this.carga[this.nAux].departamento;
      this.idPregunta = this.carga[this.nAux].id_pregunta;
      this.secuencial = this.carga[this.nAux].secuencial;
      this.respuestaItem = this.carga[this.nAux].respuesta;
      this.estadoItem = this.carga[this.nAux].estado;
      this.nAux++;
    }
  }

  // primero de la carga
  primero() {
    this.contexto = this.carga[0].contexto;
    this.departamentoItem = this.carga[0].departamento;
    this.idPregunta = this.carga[0].id_pregunta;
    this.secuencial = this.carga[0].secuencial;
    this.respuestaItem = this.carga[0].respuesta;
    this.estadoItem = this.carga[0].estado;
    this.nAux = 1;
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
