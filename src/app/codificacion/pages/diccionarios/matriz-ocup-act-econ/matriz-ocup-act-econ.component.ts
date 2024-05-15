import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MatrizService } from './services/matriz.service';


import * as FileSaver from 'file-saver';



@Component({
  selector: 'app-matriz-ocup-act-econ',
  templateUrl: './matriz-ocup-act-econ.component.html',
  styleUrls: ['./matriz-ocup-act-econ.component.scss']
})
export class MatrizOcupActEconComponent implements OnInit {

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


  constructor(private messageService: MessageService, private matrizService: MatrizService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    //this.catalogosService.getCustomersMedium().then(data => this.customers1 = data);
    //this.catalogosService.getCustomersMedium().then(data => this.customers2 = data);

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


  // editRegistro(product: Product) {  
  editRegistro(registro: any) {
    this.registro = { ...registro };
    this.registroDialog = true;
  }


  // Tabla detalle
  registrosTabla() {
    this.tabla_pb = true;
    this.matrizService.devuelveMatriz().subscribe(
      (data2: any) => {
        console.log("data2", data2.datos.rows);
        this.tabla_pb = false;
        this.registros = data2.datos.rows;;
      })
  }

  // Eliminar registros
  deletetRegistro(registro: any) {
    this.registro = { ...registro };
    this.dialogEliminar = true
  }

  // Confirmar eliminar registros
  confirmDeleteRegistro() {
    this.matrizService.updateEstadoMatriz(this.registro.id_cod_matriz, { estado: 'INACTIVO', user: localStorage.getItem('login') }).subscribe(
      (data2: any) => {
        this.dialogEliminar = false;
        this.registrosTabla();
        this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: 'Registro eliminado.', life: 2500 });
      })
  }


  // Guaradar o editar registro
  saveRegistro() {

    this.submitted = true;

    if (this.registro.codigo_ocupacion.trim() && this.registro.codigo_acteco.trim() && (this.registro.descripcion_ocupacion.trim() || this.registro.descripcion_acteco.trim())) {

      if (this.registro.id_cod_matriz) {

        // UPDATE

        //alert("update");

        this.matrizService.updateMatriz(this.registro.id_cod_matriz, {
          codigo_ocupacion: this.registro.codigo_ocupacion,
          codigo_acteco: this.registro.codigo_acteco,
          descripcion_ocupacion: this.registro.descripcion_ocupacion,
          descripcion_acteco: this.registro.descripcion_acteco,
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

      } else {
        // ADD
        //alert("add");



        this.matrizService.insertarMatriz({
          //erradas: this.registro.erradas,
          codigo_ocupacion: this.registro.codigo_ocupacion,
          codigo_acteco: this.registro.codigo_acteco,
          descripcion_ocupacion: this.registro.descripcion_ocupacion,
          descripcion_acteco: this.registro.descripcion_acteco,
          //corregidas: this.registro.corregidas,
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

  exportExcel() {
    let date = new Date();
    let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.registros);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "MatrizOcupAct-" + formattedDate);
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
