import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supervision-lote-simple',
  templateUrl: './supervision-lote-simple.component.html',
  styleUrls: ['./supervision-lote-simple.component.scss']
})
export class SupervisionLoteSimpleComponent implements OnInit {

  registros = [];


  
  products: any;

  selectedProduct1: any;

  selectedProduct2: any;

  selectedProduct3: any;

  selectedProduct4: any;

  selectedProducts1: any;

  selectedProducts2: any;

  selectedProducts3: any;

  selectedProducts4: any;

  selectedProducts5: any;


  constructor() { }

  ngOnInit(): void {
    this.registros=[
      {
        respuesta: "CASTELLANO",
        codigo:"006" ,
        codificador: "AUTOMATICO_NORMALIZADO" ,
        varApoyo: "- - -",
      },
      {
        respuesta: "QUECHUA",
        codigo:"027" ,
        codificador: "AUTOMATICO_NORMALIZADO" ,
        varApoyo: "- - -",
      }
    ]
  }

  registrosTabla(){}

}
