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

  //
  registrosAux: any = [];
  first: number = 0;

  // Campos de busqueda
  codigo: string = '';
  descripcion: string = '';
  feccre: string = '';
  usucre: string = '';
  fecmod: string = '';
  usumod: string = '';


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

  // Buscar por el campo codigo
  buscarPorCodigo() {

    // limpiar los demas campos
    this.descripcion = '';
    this.feccre = '';
    this.usucre = '';
    this.fecmod = '';
    this.usumod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];

    // recorrer registros
    this.registros.forEach(element => {
      // El codigo debe ser igual al input codigo de izquierda a derecha, en caso de que el codigo sea null, no se debe mostrar
      if (element.codigo.startsWith(this.codigo)) {
        // agregar a registrosAux
        this.registrosAux.push(element);
      }
    });

    // ordenar por codigo registrosAux de menor tamaño de caracteres a mayor
    this.registrosAux.sort((a, b) => (a.codigo.length > b.codigo.length) ? 1 : -1);

  }

  // Buscar por el campo descripcion
  buscarPorDescripcion() {

    // limpiar los demas campos
    this.codigo = '';
    this.feccre = '';
    this.usucre = '';
    this.fecmod = '';
    this.usumod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];

    // hacer la busqueda en los registros por descripcion
    this.registros.forEach(element => {
      if (element.descripcion.toLowerCase().includes(this.descripcion.toLowerCase())) {
        // agregar a registrosAux
        this.registrosAux.push(element);
      }
    });

  }

  // Buscar por el campo fecha de creacion
  buscarPorFecCre() {

    // limpiar los demas campos
    this.codigo = '';
    this.descripcion = '';
    this.usucre = '';
    this.fecmod = '';
    this.usumod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];

    // hacer la busqueda en los registros por fecha de creacion
    this.registros.forEach(element => {
      if (element.feccre.toLowerCase().includes(this.feccre.toLowerCase())) {
        // agregar a registrosAux
        this.registrosAux.push(element);
      }
    });
  }

  // Buscar por el campo usuario de creacion
  buscarPorUsuCre() {

    // limpiar los demas campos
    this.codigo = '';
    this.descripcion = '';
    this.feccre = '';
    this.fecmod = '';
    this.usumod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];

    // hacer la busqueda en los registros por usuario de creacion
    this.registros.forEach(element => {
      if (element.usucre.toLowerCase().includes(this.usucre.toLowerCase())) {
        // agregar a registrosAux
        this.registrosAux.push(element);
      }
    });
  }

  // Buscar por el campo fecha de modificacion
  buscarPorFecMod() {

    // limpiar los demas campos
    this.codigo = '';
    this.descripcion = '';
    this.feccre = '';
    this.usucre = '';
    this.usumod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];

    // hacer la busqueda en los registros por fecha de modificacion
    this.registros.forEach(element => {
      if (element.fecmod.toLowerCase().includes(this.fecmod.toLowerCase())) {
        // agregar a registrosAux
        this.registrosAux.push(element);
      }
    });
  }

  // Buscar por el campo usuario de modificacion
  buscarPorUsuMod() {

    // limpiar los demas campos
    this.codigo = '';
    this.descripcion = '';
    this.feccre = '';
    this.usucre = '';
    this.fecmod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];

    // hacer la busqueda en los registros por usuario de modificacion
    this.registros.forEach(element => {
      if (element.usumod.toLowerCase().includes(this.usumod.toLowerCase())) {
        // agregar a registrosAux
        this.registrosAux.push(element);
      }
    });
  }

  // Buscar por el campos
  busquedaPorLosDemasCampos() {
    this.registrosAux = this.registros;
    this.codigo = '';
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
    // Limpiar todos los campos de busqueda
    this.codigo = '';
    this.descripcion = '';
    this.feccre = '';
    this.usucre = '';
    this.fecmod = '';
    this.usumod = '';
        
    this.tabla_pb = true;
    this.catalogosService.devuelveCatalogo({ catalogo: this.selectedCatalogo.value }).subscribe(
      (data2: any) => {
        this.tabla_pb = false;
        this.registros = data2.datos.rows;
        console.table(data2.datos.rows);
        this.registrosAux = data2.datos.rows;
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
            this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: 'Codificación exitosa.', life: 2500 });
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
