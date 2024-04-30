import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CorrectorService } from './services/corrector.service';





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
  selector: 'app-corrector',
  templateUrl: './corrector.component.html',
  styleUrls: ['./corrector.component.scss']
})
export class CorrectorComponent implements OnInit {



  /* 
    products: Product[];

    product: Product;
  */



  // registros
  registros: any;
  registro: any;



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

  constructor(private messageService: MessageService, private correctorService: CorrectorService) { }

  ngOnInit(): void {


    // this.show();  
    this.registros = [
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
    ];

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

    this.datosTablaDetalle();

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
  datosTablaDetalle() {
    //this.progressBar.tabla01Cap_pb = true;
    //this.progressBar.btnExcel_disabled = true;
    this.correctorService.devuelveCorrector().subscribe(
      (data2: any) => {
        //this.progressBar.tabla01Cap_pb = false;
        this.registros = data2;
      })
  }

  saveRegistro() {
    this.submitted = true;
    //alert("saveREgistro");
    //console.log("confirmationService", this.confirmationService);
    // this.show();
    if (
      this.registro.codigo.trim()) {
      if (this.registro.id_catalogo && this.registro.descripcion) {
        console.log("UPDATE");
        // UPDATE
        /* this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
        this.products[this.findIndexById(this.product.id)] = this.product; */
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        console.log("ADD");
        // this.product.id = this.createId();
        // this.product.code = this.createId();
        // this.product.image = 'product-placeholder.svg';
        // @ts-ignore
        // this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
        // this.products.push(this.product);
        // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      // this.products = [...this.products];
      // this.productDialog = false;
      // this.product = {};
    }
    // console.log("this.registro", this.registro);
    //this.showSuccessViaToast();
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
