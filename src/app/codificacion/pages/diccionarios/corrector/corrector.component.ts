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

  
  // registroDialog
  registroDialog: boolean;


  // submitted
  submitted: boolean;




  //msgService
  msgService: boolean = false;
  titleMsgError: string = '';

  //dialog eliminar
  dialogEliminar: boolean = false;

 

  constructor(private correctorService: CorrectorService, private messageService: MessageService, private confirmationService: ConfirmationService) { }


  ngOnInit(): void {

    this.registrosTabla();
  }

  openNew() {
    this.submitted = false;
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

   // Guaradar o editar registro
   saveRegistro() {
    
    this.submitted = true;

    if (this.registro.erradas.trim() && this.registro.corregidas.trim()) {

      if (this.registro.id) {

        // UPDATE

        //alert("update");
        
        this.correctorService.updateCorrector(this.registro.id, {
          user: localStorage.getItem('login'),
          erradas: this.registro.erradas,
          corregidas: this.registro.corregidas
        }).subscribe(
          (data2: any) => {
            if (data2.success == true) {
              this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: data2.message, life: 2500 });
              this.registroDialog = false;
              this.registrosTabla();
            } else {
              this.msgService = true;
              this.titleMsgError = data2.message;

              setTimeout(() => {
                this.msgService = false;
                this.titleMsgError = '';
              }, 2500);
            }
          })


      } else {
        // ADD
        //alert("add");
        
        this.correctorService.insertCorrector({
          erradas: this.registro.erradas,
          corregidas: this.registro.corregidas,
          user: localStorage.getItem('login')
        }).subscribe(
          (data2: any) => {
            if (data2.success == true) {
              this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: data2.message, life: 2500 });
              this.registroDialog = false;
              this.registrosTabla();
            } else {
              this.msgService = true;
              this.titleMsgError = data2.message;

              setTimeout(() => {
                this.msgService = false;
                this.titleMsgError = '';
              }, 2500);
            }
          })

      }

    }
  };

  // editRegistro(product: Product) {  
  editRegistro(registro: any) {
    this.registro = { ...registro };
    this.registroDialog = true;
  }

  // Eliminar registros
  deletetRegistro(registro: any) {
    this.registro = { ...registro };
    this.dialogEliminar = true
  }

  // Confirmar eliminar registros
  confirmDeleteRegistro() {
    this.correctorService.updateEstadoDiccCorr(this.registro.id, { estado: 'INACTIVO', user: localStorage.getItem('login') }).subscribe(
      (data2: any) => {
        this.dialogEliminar = false;
        this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: 'Registro eliminado.', life: 2500 });
        this.registrosTabla();
      })
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
