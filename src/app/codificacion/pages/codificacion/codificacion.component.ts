import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CodificacionService } from './service/codificacion.service';
// import { CodificacionService } from '../service/codificacion.service';


@Component({
  selector: 'app-codificacion',
  templateUrl: './codificacion.component.html',
  styleUrls: ['./codificacion.component.scss']
})
export class CodificacionComponent implements OnInit {
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

constructor(private messageService: MessageService, private codificacionService: CodificacionService, private confirmationService: ConfirmationService) { }


ngOnInit(): void {
  
  this.catalogos = [
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
  /* [
    { value: 'cat_caeb', txt: 'cat_caeb' },
    { value: 'cat_cob', txt: 'cat_cob' },
    { value: 'cat_idioma', txt: 'cat_idioma' },
    { value: 'cat_npioc', txt: 'cat_npioc' },
    { value: 'cat_pais', txt: 'cat_pais' },
    { value: 'cat_municipio', txt: 'cat_municipio' },
  ]; */
  this.selectedCatalogo = { label: 'La Paz', value: 'LA PAZ' };

  // this.show();  
  this.registros = [
    {
      nroPreg:"20",
      variable: "Alguna persona que vivía con usted(es) en este hogar, ¿actualmente vive en otro país?",
      total: 0
     
    },
    {
      nroPreg:"32",
      variable: "¿Se autoidentifica con alguna nación, pueblo indígena originario campesino o afroboliviano?",
      total: 0
    },
    {
      nroPreg:"33",
      variable: "Idioma 1",
      total: 0
    },
    {
      nroPreg:"33",
      variable: "Idioma 2",
      total: 0
    },
    {
      nroPreg:"33",
      variable: "Idioma 3",
      total: 1
    },
    {
      nroPreg:"34",
      variable: "¿Cuál es el primer idioma o lengua en el que aprendió a hablar en su niñez?",
      total: 0
    },
    {
      nroPreg:"35",
      variable: "¿Dónde nació?",
      total: 0
    },
    {
      nroPreg:"36",
      variable: "¿Dónde vive habitualmente?",
      total: 0
    },
    {
      nroPreg:"37",
      variable: "¿Dónde vivía el año 2019?",
      total: 0
    },
    {
      nroPreg:"48",
      variable: "Las últimas 4 semanas:",
      total: 0
    },
    {
      nroPreg:"49-51",
      variable: "Ocupación - Actividad Económica",
      total: 1
    },
    {
      nroPreg:"52",
      variable: "Principalmente, el lugar donde trabaja está ubicado:",
      total: 0
    },
  ];



  //this.catalogosService.getCustomersMedium().then(data => this.customers1 = data);
  //this.catalogosService.getCustomersMedium().then(data => this.customers2 = data);

  //this.registrosTabla();
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
