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
