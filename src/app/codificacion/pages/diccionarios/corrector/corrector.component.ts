import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CorrectorService } from './services/corrector.service';

import * as FileSaver from 'file-saver';



@Component({
  selector: 'app-corrector',
  templateUrl: './corrector.component.html',
  styleUrls: ['./corrector.component.scss']
})
export class CorrectorComponent implements OnInit {



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



  // catalogos  
  catalogos: any;
  selectedCatalogo: any;

  constructor(private correctorService: CorrectorService, private messageService: MessageService, private confirmationService: ConfirmationService) { }



  ngOnInit(): void {

    this.catalogos = [
      { value: 'cat_caeb', txt: 'cat_caeb' },
      { value: 'cat_cob', txt: 'cat_cob' },
      { value: 'cat_idioma', txt: 'cat_idioma' },
      { value: 'cat_npioc', txt: 'cat_npioc' },
      { value: 'cat_pais', txt: 'cat_pais' },
      { value: 'cat_municipio', txt: 'cat_municipio' },
    ];
    this.selectedCatalogo = { value: 'cat_caeb', txt: 'cat_caeb' };

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

    this.correctorService.devuelveCorrector().subscribe(
      (data2: any) => {
        console.log("data2", data2.datos.rows);
        this.tabla_pb = false;
        this.registros = data2.datos.rows;;
      })
  }


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



  exportarExcel_() {
    
  }

  exportExcel() {
    let date = new Date();
    let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.registros);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Dic-Corrector-" + formattedDate);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: 'Exportación completada.', life: 2000 });
  }



}
