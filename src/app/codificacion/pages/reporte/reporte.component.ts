import { Component, OnInit } from '@angular/core';
import { ReporteService } from './service/reporte.service';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  // localstorage
  rol_id: number;

  // reportes y descargas
  rep01: boolean = false;
  rep02: boolean = false;
  rep03: boolean = false;
  rep04: boolean = false;
  rep05: boolean = false;
  rep06: boolean = false;
  rep07: boolean = false;
  rep08: boolean = false;
  rep09: boolean = false;
  rep10: boolean = false;
  rep11: boolean = false;
  rep12: boolean = false;
  rep13: boolean = false;
  down01: boolean = false;

  registros: any;

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {

    this.rol_id = Number(localStorage.getItem('rol_id'));

    // Reportes que debe ver el usuario SuperAdmin
    if (this.rol_id === 1) {
      this.rep01 = true;
      this.rep02 = true;
      this.rep03 = true;
      this.rep04 = true;
      this.rep05 = true;
      this.rep06 = true;
      this.rep07 = true;
      this.rep08 = true;
      this.rep09 = true;
      this.rep10 = true;
      this.rep11 = true;
      this.rep12 = true;
      this.rep13 = true;
      this.down01 = true;
    }
    // Reportes que debe ver el usuario Responsable especialista
    if (this.rol_id === 2) {
      this.rep01 = true;
      this.rep02 = true;
      this.rep03 = true;
      this.rep04 = true;
      this.rep05 = true;
      this.rep06 = true;
      this.rep07 = true;
      this.rep08 = true;
      this.rep09 = true;
      this.rep10 = true;
      this.rep11 = true;
      this.rep12 = true;
      this.rep13 = true;
      this.down01 = true;
    }
    // Reportes que debe ver el usuario Jefe de turno
    if (this.rol_id === 3) {
      this.rep01 = true;
      this.rep02 = true;
      this.rep03 = true;
      this.rep04 = true;
      this.rep05 = true;
      this.rep06 = true;
      this.rep07 = true;
      this.rep08 = true;
      this.rep09 = true;
      this.rep10 = true;
      this.rep11 = true;
      this.rep12 = true;
      this.rep13 = true;
      this.down01 = false;
    }
    // Reportes que debe ver el usuario Supervisor de codificación
    if (this.rol_id === 4) {
      this.rep01 = false;
      this.rep02 = false;
      this.rep03 = true;
      this.rep04 = false;
      this.rep05 = true;
      this.rep06 = false;
      this.rep07 = false;
      this.rep08 = false;
      this.rep09 = true;
      this.rep10 = true;
      this.rep11 = true;
      this.rep12 = true;
      this.rep13 = false;
      this.down01 = false;
    }
    // Reportes que debe ver el usuario Técnico de codificación
    if (this.rol_id === 5) {
      this.rep01 = false;
      this.rep02 = false;
      this.rep03 = false;
      this.rep04 = false;
      this.rep05 = false;
      this.rep06 = false;
      this.rep07 = false;
      this.rep08 = false;
      this.rep09 = false;
      this.rep10 = false;
      this.rep11 = false;
      this.rep12 = false;
      this.rep13 = false;
      this.down01 = false;
    }
    // Reportes que debe ver el usuario Tecnico de contingencia
    if (this.rol_id === 6) {
      this.rep01 = false;
      this.rep02 = false;
      this.rep03 = false;
      this.rep04 = false;
      this.rep05 = false;
      this.rep06 = false;
      this.rep07 = false;
      this.rep08 = false;
      this.rep09 = false;
      this.rep10 = false;
      this.rep11 = false;
      this.rep12 = false;
      this.rep13 = false;
      this.down01 = false;
    }
  }

  download01() {
    //this.reporte_pb = true;
    this.reporteService.download01().subscribe(
      (data2: any) => {
        //this.reporte_pb = false;
        this.registros = data2.datos;
        // console.log("registros", this.registros);
        this.exportExcel();
      })
  }

  // exportar a excel 
  exportExcel() {

    let date = new Date();
    let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.registros);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "p49-p51-" + formattedDate);
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