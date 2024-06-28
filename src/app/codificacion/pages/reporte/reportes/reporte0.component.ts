import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ReporteService } from '../service/reporte.service';

import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-reporte0',
  templateUrl: './reporte0.component.html'
})
export class Reporte0Component implements OnInit {
  items: any;

  // Datos de la tabla
  registros: any;
  registrosConFiltro: any;

  // Busqueda
  busqueda: any;

  // 
  departamentos: any;
  selectedDepartamento: any;

  // ProgresBar
  progressBar: any = {
    reporte1_pb: false
  };

  constructor(private router: Router, private reporteService: ReporteService,private messageService: MessageService) { }

  ngOnInit(): void {

    this.departamentos = [
      { cod_depto: '01', departamento: 'CHUQUISACA' },
      { cod_depto: '02', departamento: 'LA PAZ' },
      { cod_depto: '03', departamento: 'COCHABAMBA' },
      { cod_depto: '04', departamento: 'ORURO' },
      { cod_depto: '05', departamento: 'POTOSI' },
      { cod_depto: '06', departamento: 'TARIJA' },
      { cod_depto: '07', departamento: 'SANTA CRUZ' },
      { cod_depto: '08', departamento: 'BENI' },
      { cod_depto: '09', departamento: 'PANDO' }
    ]
    this.selectedDepartamento = { cod_depto: '04', departamento: 'ORURO' };


    this.reporte();
  }


  // Reporte
  reporte() {
    this.progressBar.reporte_pb = true;
    this.reporteService.reporte0({ cod_depto: this.selectedDepartamento.cod_depto }).subscribe(
      (data2: any) => {
        this.progressBar.reporte_pb = false;
        this.registros = data2.datos//.resultado//data2.datos.rows;
        console.table(this.registros);

        //this.registrosConFiltro = this.registros.filter((res: any) => res.catalogo == this.selectedDepartamento.cod_depto);       
      })
  }


  /*  changeCatalogo(){    
     this.registrosConFiltro = this.registros.filter((res: any) => res.catalogo == this.selectedCatalogo.value);   
   } */


    
  // simbolo de carita feliz y otros emojis
  /* caritaFeliz(value: any) {
    if (value == 1) {
      return '😀';
    }
    if (value == 2) {
      return '😐';
    }
    if (value == 3) {
      return '😞';
    }
    if (value == 4) {
      return '😡';
    }
  } */



  // exportar a excel 
  exportExcel() {
    // verificamos la cantidad de registros
    if (this.registros.length == 0) {      
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No hay registros para exportar 😞'});
      return;
    }
    let date = new Date();
    let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.registros);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Reporte-Cuestionarios-" + this.selectedDepartamento.departamento + "-" + formattedDate);
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
