import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MatrizService } from './services/matriz.service';
// import { CorrectorService } from '../corrector/services/corrector.service';






/* export interface Registro {
  id_catalogo?: number;
  catalogo?: string;
  codigo?: string;
  descripcion?: string;
  estado?: string;
  usucre?: string;
  feccre?: string;
  usumod?: string;
  fecmod?: string;
  descripcion_unida?: string;
  unico?: number;
} */
// number | null

/* export interface Welcome {
  id_catalogo:       number;
  catalogo:          string;
  codigo:            string;
  descripcion:       string;
  estado:            string;
  usucre:            string;
  feccre:            Date;
  usumod:            string | null;
  fecmod:            string | null;
  descripcion_unida: string;
  unico:             number | null;
} */





export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customer {
  id?: number;
  name?: number;
  country?: Country;
  company?: string;
  date?: string;
  status?: string;
  representative?: Representative;
}

@Component({
  selector: 'app-matriz-ocup-act-econ',
  templateUrl: './matriz-ocup-act-econ.component.html',
  styleUrls: ['./matriz-ocup-act-econ.component.scss']
})
export class MatrizOcupActEconComponent implements OnInit {



  /* 
    products: Product[];

    product: Product;
  */



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
  customers2: Customer[];

  selectedCustomer1: Customer;
  selectedCustomer2: Customer;

  constructor(private messageService: MessageService, private matrizService: MatrizService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {


    //this.catalogosService.getCustomersMedium().then(data => this.customers1 = data);
    //this.catalogosService.getCustomersMedium().then(data => this.customers2 = data);

    this.datosTablaDetalle();

  }


  openNew() {
    this.registro = {};
    this.submitted = false;
    this.registroDialog = true;
  }


  hideDialog() {
    this.registroDialog = false;
    this.submitted = false;
  }


  // Tabla detalle
  datosTablaDetalle() {
    this.tabla_pb = true;
    this.matrizService.devuelveMatriz().subscribe(
      (data2: any) => {
        this.tabla_pb = false;
        this.registros = data2;
      })
  }

  saveRegistro() {
    this.submitted = true;
    if (this.registro.codigo_ocupacion.trim() && this.registro.descripcion_ocupacion.trim() && this.registro.codigo_acteco && this.registro.descripcion_acteco.trim()) {
      if (this.registro.id_cod_matriz) {
        alert("UPDATE");
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        alert("ADD");
      }

      this.registros = [...this.registros];
      this.registroDialog = false;
      this.registro = {};
    }

    this.registroDialog = false;
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //this.MessageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
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





  /*     saveProduct_() {
        this.submitted = true;
    
        if (this.product.name.trim()) {
          if (this.product.id) {
            this.products[this.findIndexById(this.product.id)] = this.product;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          }
          else {
            this.product.id = this.createId();
            this.product.image = 'product-placeholder.svg';
            this.products.push(this.product);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          }
    
          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
        }
      } */


}
