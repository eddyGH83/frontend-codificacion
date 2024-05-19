import { Component, OnInit } from '@angular/core';
//import { Customer } from './catalogos';
import { CatalogosService } from './services/catalogos.service';
import { ConfirmationService, MessageService } from 'primeng/api';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import * as FileSaver from 'file-saver';




@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.scss']
})
export class CatalogosComponent implements OnInit {

  // registros
  registros: any;
  registro: any;


  // Progress Bar
  tabla_pb: boolean = false;



  // selectedRegistros: any;


  // msgs: any = [];


  // registroDialog
  registroDialog: boolean;


  // submitted
  submitted: boolean;




  // catalogos  
  catalogos: any;
  selectedCatalogo: any;

  //msgService
  msgService: boolean = false;
  titleMsgError: string = '';

  //dialog eliminar
  dialogEliminar: boolean = false;

  constructor(private messageService: MessageService, private catalogosService: CatalogosService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.catalogos = [
      { value: 'cat_caeb', txt: 'cat_caeb' },
      { value: 'cat_cob', txt: 'cat_cob' },
      { value: 'cat_idioma', txt: 'cat_idioma' },
      { value: 'cat_npioc', txt: 'cat_npioc' },
      { value: 'cat_pais', txt: 'cat_pais' },
      { value: 'cat_municipio', txt: 'cat_municipio' },
    ];
    this.selectedCatalogo = { value: 'cat_pais', txt: 'cat_pais' };

    this.registrosTabla();

  }

  openNew() {
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
    this.catalogosService.devuelveCatalogo({ catalogo: this.selectedCatalogo.value }).subscribe(
      (data2: any) => {
        //console.log("data2", data2.datos);
        this.tabla_pb = false;
        this.registros = data2.datos.rows;
      })
  }


  // Guaradar o editar registro
  saveRegistro() {
    this.submitted = true;

    if (this.registro.codigo.trim() && this.registro.descripcion.trim()) {

      if (this.registro.id_catalogo) {

        // UPDATE
        this.catalogosService.updateCatalogo(this.registro.id_catalogo, {
          user: localStorage.getItem('login'),
          catalogo: this.selectedCatalogo.value,
          codigo: this.registro.codigo,
          descripcion: this.registro.descripcion
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
        this.catalogosService.insertarCatalogo({
          user: localStorage.getItem('login'),
          catalogo: this.selectedCatalogo.value,
          codigo: this.registro.codigo,
          descripcion: this.registro.descripcion
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


  // Editar registro  
  editRegistro(registro: any) {
    this.registro = { ...registro };
    this.registroDialog = true;
  }


  // Eliminar registros
  deletetRegistro(registro: any) {
    this.registro = { ...registro };

    this.confirmationService.confirm({
      message: '¿Está seguro de <strong>eliminar</strong> este registro del catálogo?',
      header: 'Confirmación',
      icon: 'pi pi-trash',
      accept: () => {

        this.catalogosService.updateEstadoCatalogo(this.registro.id_catalogo, { estado: 'INACTIVO', user: localStorage.getItem('login') }).subscribe(
          (data2: any) => {
            this.dialogEliminar = false;
            this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: 'Registro eliminado.', life: 2500 });
            this.registrosTabla();
          })
      },
    });

  }


  // exportar a excel 
  exportExcel() {
    let date = new Date();
    let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.registros);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.selectedCatalogo.value + "_" + formattedDate);
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
