import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ReporteService } from '../service/reporte.service';


import * as FileSaver from 'file-saver';



@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html'
})
export class Reporte2Component implements OnInit {


  items: any;

  // Datos de la tabla
  registros: any;
  registrosConFiltro: any;

  // Busqueda
  busqueda: any;

  catalogos: any;
  selectedCatalogo: any;

  // ProgresBar
  progressBar: any = {
    reporte1_pb: false
  };


  constructor(private router: Router, private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.catalogos = [
      { label: 'cat_caeb', value: 'cat_caeb' },
      { label: 'cat_cob', value: 'cat_cob' },
      { label: 'cat_idioma', value: 'cat_idioma' },
      { label: 'cat_npioc', value: 'cat_npioc' },
      { label: 'cat_pais', value: 'cat_pais' },
      { label: 'cat_municipio', value: 'cat_municipio' }
    ];
    this.selectedCatalogo = { label: 'cat_caeb', value: 'cat_caeb' };
    this.reporte();
  }


  // Reporte
  reporte() {
    this.progressBar.reporte_pb = true;
    this.reporteService.reporte2().subscribe(
      (data2: any) => {
        this.progressBar.reporte_pb = false;
        this.registros = data2.datos.rows;
        this.registrosConFiltro = this.registros.filter((res: any) => res.catalogo == this.selectedCatalogo.value);
      })
  }


  changeCatalogo() {
    this.registrosConFiltro = this.registros.filter((res: any) => res.catalogo == this.selectedCatalogo.value);
  }

  // exportar a excel 
  exportExcel() {
    // Recorrer el arreglo y convertir a numero
    this.registrosConFiltro.forEach((element: any) => {
      element.sum = Number(element.sum);
    });

    let date = new Date();
    let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.registrosConFiltro);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Reporte02-" + this.selectedCatalogo.value + "-" + formattedDate);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
