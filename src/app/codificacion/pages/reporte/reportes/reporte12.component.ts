import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ReporteService } from '../service/reporte.service';

import * as FileSaver from 'file-saver';


interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-reporte12',
  templateUrl: './reporte12.component.html'
})
export class Reporte12Component implements OnInit {

  registros: any;

  reporte_pb: any


  constructor(private router: Router, private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.reporte();
  }

  // Reporte
  reporte() {
    this.reporte_pb = true;
    this.reporteService.reporte12().subscribe(
      (data2: any) => {
        this.reporte_pb = false;
        this.registros =data2.datos.rows;
        console.log("registros", this.registros);

      })
  }


  // exportar a excel 
  exportExcel() {
    //
    this.registros.forEach((element: any) => {
      element.frecuencia = Number(element.frecuencia);
    });

    let date = new Date();
    let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.registros);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Reporte12-" + formattedDate);
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
