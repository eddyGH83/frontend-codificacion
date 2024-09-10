import { Component, OnInit, HostListener } from '@angular/core';  // El HostListener es para escuchar eventos en el documento
import { ConfirmationService, MessageService } from 'primeng/api';
import { MatrizService } from './services/matriz.service';


import * as FileSaver from 'file-saver';



@Component({
  selector: 'app-matriz-ocup-act-econ',
  templateUrl: './matriz-ocup-act-econ.component.html',
  styleUrls: ['./matriz-ocup-act-econ.component.scss']
})
export class MatrizOcupActEconComponent implements OnInit {

  // Este decorador permite escuchar eventos en el documento.
  @HostListener('document:keydown', ['$event'])

  // Esta función se ejecuta cada vez que se presiona una tecla en el documento.
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && (event.key === 'p' || event.key === 'P')) {
      event.preventDefault(); // Esto previene la acción predeterminada de Ctrl+A (seleccionar todo).
      this.openNew();
    }
  }


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

  // dt_matriz
  registrosAux: any;



  //msgService
  msgService: boolean = false;
  titleMsgError: string = '';

  //dialog eliminar
  dialogEliminar: boolean = false;


  // Para los campos de busqueda
  codigo_ocupacion: string = '';
  descripcion_ocupacion: string = '';
  codigo_acteco: string = '';
  descripcion_acteco: string = '';
  usucre: string = '';
  feccre: string = '';
  usumod: string = '';
  fecmod: string = '';

  // Paginador
  first: number = 0;



  constructor(private messageService: MessageService, private matrizService: MatrizService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.registrosTabla();
  }




  openNew() {
    // alert('Ctrl + P');
    this.submitted = false;
    this.registro = {};
    this.registroDialog = true;
    //
    this.registro.descripcion_ocupacion = ''
    this.registro.descripcion_acteco = ''
    this.registro.codigo_ocupacion = ''
    this.registro.codigo_acteco = ''
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
        //console.table(data2.datos.rows);
        //console.log("####------------------------------------------------------####");
        
        this.tabla_pb = false;
        this.registros = data2.datos.rows;
        this.registrosAux = data2.datos.rows;
      })
  }

  // Eliminar registros
  deletetRegistro(registro: any) {
    this.registro = { ...registro };
    this.confirmationService.confirm({
      message: '¿Está seguro de <strong>eliminar</strong> este registro del Catálogo?',
      header: 'Confirmación',
      icon: 'pi pi-trash',
      accept: () => {
        this.matrizService.updateEstadoMatriz(this.registro.id_cod_matriz, { estado: 'INACTIVO', user: localStorage.getItem('login') }).subscribe(
          (data2: any) => {
            this.dialogEliminar = false;
            this.registrosTabla();
            this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: 'Registro eliminado.', life: 2500 });
          })
      },
    });
  }

  //$event.target.value   
  ordenar(cod_aux: any) {


    /* const valorCodigoOcupacion = this.inputCodigoOcupacionRef.nativeElement.value;
    const valorCodigoActEco = this.inputCodigoActEcoRef.nativeElement.value;

    if (valorCodigoOcupacion.length == 0 && valorCodigoActEco.length == 0) {
      this.registros = this.registrosAux;      
    } */

    //console.log('Valor de #inputCodigoOcupacion:', valorCodigoOcupacion);
    //console.log('Valor de #inputCodigoActEco:', valorCodigoActEco);


    if (cod_aux == 'codigo_ocupacion') {
      this.registros.sort((a, b) => (a.codigo_ocupacion.length > b.codigo_ocupacion.length) ? 1 : -1);
    }

    if (cod_aux == 'codigo_acteco') {
      this.registros.sort((a, b) => (a.codigo_acteco.length > b.codigo_acteco.length) ? 1 : -1);
    }
  }







  // Guaradar o editar registro
  saveRegistro() {

    this.submitted = true;
    // veirificar que codigo_ocupacion, codigo_acteco y tambien descripcion_acteco o descripcion_ocupacion no esten vacios

    if ((this.registro.descripcion_acteco.trim() || this.registro.descripcion_ocupacion.trim()) && this.registro.codigo_ocupacion.trim() && this.registro.codigo_acteco.trim()) {

      if (this.registro.id_cod_matriz) {
        // UPDATE
        this.matrizService.updateMatriz(this.registro.id_cod_matriz, {
          codigo_ocupacion: this.registro.codigo_ocupacion,
          codigo_acteco: this.registro.codigo_acteco,
          descripcion_ocupacion: this.registro.descripcion_ocupacion !== undefined ? this.registro.descripcion_ocupacion : '',
          descripcion_acteco: this.registro.descripcion_acteco !== undefined ? this.registro.descripcion_acteco : '',
          user: localStorage.getItem('login')
        }).subscribe(
          (data2: any) => {
            if (data2.success == true) {
              this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: data2.message, life: 3000 });
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
        // ADDITION
        this.matrizService.insertarMatriz({
          //erradas: this.registro.erradas,
          codigo_ocupacion: this.registro.codigo_ocupacion,
          codigo_acteco: this.registro.codigo_acteco,
          descripcion_ocupacion: this.registro.descripcion_ocupacion !== undefined ? this.registro.descripcion_ocupacion : '',
          descripcion_acteco: this.registro.descripcion_acteco !== undefined ? this.registro.descripcion_acteco : '',
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
