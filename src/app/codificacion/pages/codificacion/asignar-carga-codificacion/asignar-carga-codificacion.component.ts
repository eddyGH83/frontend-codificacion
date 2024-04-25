import { Component, OnInit } from '@angular/core';
//import { CatalogosService } from './services/catalogos.service';
import { ConfirmationService, MessageService } from 'primeng/api';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CodificacionService } from '../service/codificacion.service';

@Component({
  selector: 'app-asignar-carga-codificacion',
  templateUrl: './asignar-carga-codificacion.component.html',
  styleUrls: ['./asignar-carga-codificacion.component.scss']
})
export class AsignarCargaCodificacionComponent implements OnInit {


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
    /* this.registros = [
      {
        id_catalogo: 147190,
        catalogo: "cat_municipio_pais",
        codigo: "724",
        descripcion: "España Barcelona",
        estado: "ACTIVO",
        usucre: "admin",
        feccre: "2023-08-21T00:34:55.459Z",
        usumod: "epaco21",
        fecmod: "enina35",
        descripcion_unida: "espanabarcelona",
        unico: "NO"
      },
      {
        id_catalogo: 147191,
        catalogo: "cat_pais",
        codigo: "704",
        descripcion: "Chile Santiago",
        estado: "ACTIVO",
        usucre: "admin2",
        feccre: "2023-06-08T00:34:55.459Z",
        usumod: "epaco25",
        fecmod: "enina45",
        descripcion_unida: "chilesantiago",
        unico: "SI"
      },
      {
        id_catalogo: 147192,
        catalogo: "cat_estado",
        codigo: "NY",
        descripcion: "New York",
        estado: "ACTIVO",
        usucre: "admin3",
        feccre: "2023-06-08T00:34:55.459Z",
        usumod: "epaco26",
        fecmod: "enina46",
        descripcion_unida: "newyork",
        unico: "SI"
      },
      {
        id_catalogo: 147193,
        catalogo: "cat_estado",
        codigo: "CA",
        descripcion: "California",
        estado: "ACTIVO",
        usucre: "admin4",
        feccre: "2023-06-08T00:34:55.459Z",
        usumod: "epaco27",
        fecmod: "enina47",
        descripcion_unida: "california",
        unico: "NO"
      },
      {
        id_catalogo: 147194,
        catalogo: "cat_estado",
        codigo: "TX",
        descripcion: "Texas",
        estado: "ACTIVO",
        usucre: "admin5",
        feccre: "2023-06-08T00:34:55.459Z",
        usumod: "epaco28",
        fecmod: "enina48",
        descripcion_unida: "texas",
        unico: "NO"
      },
      {
        id_catalogo: 147195,
        catalogo: "cat_estado",
        codigo: "FL",
        descripcion: "Florida",
        estado: "ACTIVO",
        usucre: "admin6",
        feccre: "2023-06-08T00:34:55.459Z",
        usumod: "epaco29",
        fecmod: "enina49",
        descripcion_unida: "florida",
        unico: "SI"
      },
      {
        id_catalogo: 147196,
        catalogo: "cat_estado",
        codigo: "IL",
        descripcion: "Illinois",
        estado: "ACTIVO",
        usucre: "admin7",
        feccre: "2023-06-08T00:34:55.459Z",
        usumod: "epaco30",
        fecmod: "enina50",
        descripcion_unida: "illinois",
        unico: "NO"
      },
      {
        id_catalogo: 147197,
        catalogo: "cat_estado",
        codigo: "AZ",
        descripcion: "Arizona",
        estado: "ACTIVO",
        usucre: "admin8",
        feccre: "2023-06-08T00:34:55.459Z",
        usumod: "epaco31",
        fecmod: "enina51",
        descripcion_unida: "arizona",
        unico: "SI"
      },
      {
        id_catalogo: 147198,
        catalogo: "cat_estado",
        codigo: "WA",
        descripcion: "Washington",
        estado: "ACTIVO",
        usucre: "admin9",
        feccre: "2023-06-08T00:34:55.459Z",
        usumod: "epaco32",
        fecmod: "enina52",
        descripcion_unida: "washington",
        unico: "NO"
      },
      {
        id_catalogo: 147199,
        catalogo: "cat_estado",
        codigo: "CO",
        descripcion: "Colorado",
        estado: "ACTIVO",
        usucre: "admin10",
        feccre: "2023-06-08T00:34:55.459Z",
        usumod: "epaco33",
        fecmod: "enina53",
        descripcion_unida: "colorado",
        unico: "NO"
      },
    ]; */

    this.customers1 = [
      {
        id: 33,
        name: 44,
        country: "USA",
        company: "Alfreds Futterkiste",
        date: "2020-01-01",
        status: "Active",
        representative: "Maria Anders",
      },
      {
        id: 34,
        name: 44,
        country: "USA",
        company: "Alfreds Futterkiste",
        date: "2020-01-01",
        status: "Active",
        representative: "Maria Anders",
      },
      {
        id: 35,
        name: 45,
        country: "Canada",
        company: "Berglunds snabbköp",
        date: "2020-02-01",
        status: "Inactive",
        representative: "Christina Berglund",
      },
      {
        id: 36,
        name: 46,
        country: "Mexico",
        company: "Centro comercial Moctezuma",
        date: "2020-03-01",
        status: "Active",
        representative: "Francisco Chang",
      },
      {
        id: 37,
        name: 47,
        country: "Germany",
        company: "Ernst Handel",
        date: "2020-04-01",
        status: "Active",
        representative: "Roland Mendel",
      },
      {
        id: 38,
        name: 48,
        country: "France",
        company: "Franchi S.p.A.",
        date: "2020-05-01",
        status: "Inactive",
        representative: "Paolo Accorti",
      }
    ]

    //this.catalogosService.getCustomersMedium().then(data => this.customers1 = data);
    //this.catalogosService.getCustomersMedium().then(data => this.customers2 = data);

    this.registrosTabla();
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
        this.registros =[] // data2.datos.rows;
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
              this.messageService.add({ severity: 'info', summary: 'Successful', detail: 'Registro Modificado!'});
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
