import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CodificacionService } from '../service/codificacion.service';


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

  products: any;
  product: any;
  selectedProducts: any;



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

  // router
  constructor( private router: Router, private codificacionService: CodificacionService ) { }

  ngOnInit(): void {

    this.rows = [
      { nro: 10, value: 10 },
      { nro: 50, value: 50 },
      { nro: 100, value: 100 },
      { nro: 200, value: 200 },
      { nro: 500, value: 500 },
    ];
    this.selectedRow = {nro: 10,value: 10};



    this.products = [
      {
        id: 1,
        name: 'Test',
        price: 100,
        category: 'Test',
        review: 4,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: 2,
        name: 'Phone',
        price: 45,
        category: 'mobiles',
        review: 3,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: 3,
        name: 'Car',
        price: 100,
        category: 'vehicles',
        review: 4,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: 4,
        name: 'TV',
        price: 45,
        category: 'electronics',
        review: 3,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: 5,
        name: 'Laptop',
        price: 100,
        category: 'electronics',
        review: 4,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: 6,
        name: 'Mouse',
        price: 45,
        category: 'electronics',
        review: 3,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: 7,
        name: 'Keyboard',
        price: 100,
        category: 'electronics',
        review: 4,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: 8,
        name: 'Speaker',
        price: 45,
        category: 'electronics',
        review: 3,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: 9,
        name: 'Camera',
        price: 100,
        category: 'electronics',
        review: 4,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: 10,
        name: 'Printer',
        price: 45,
        category: 'electronics',
        review: 3,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: 11,
        name: 'Tablet',
        price: 100,
        category: 'electronics',
        review: 4,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: 12,
        name: 'Monitor',
        price: 45,
        category: 'electronics',
        review: 3,
        inventoryStatus: 'LOWSTOCK',
      }

    ];

    this.registrosTabla();

  }

  // 
  registrosTabla() {
    this.codificacionService.devuelveCargaParaSupervision({ id_usuario: localStorage.getItem('id_usuario'), tabla_id: localStorage.getItem("tabla_id_sup") }).subscribe(
      (data2: any) => {
        console.table(data2.datos);

        //this.tabla_pb = false;
        this.registros = data2.datos;
      })     

  }




  hideDialog() {
    this.confirmacionDialog = false;
  }


  guardarSupervision() {
    // calcular el total de registros seleccionados si es undefined o null 
    if (this.selectedRegistros === undefined || this.selectedRegistros === null || this.selectedRegistros.length === 0) {
      this.nroRegSelected = 0;
    } else {
      this.nroRegSelected = this.selectedRegistros.length;
    }

    this.confirmacionDialog = true;
  }


  // 
  cancelarYsalir() {
    this.router.navigate(['/codificacion/supervisar-codificacion']);
  }



  /* 
    createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    } */


}
