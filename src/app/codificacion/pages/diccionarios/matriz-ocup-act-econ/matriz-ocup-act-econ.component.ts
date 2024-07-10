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

    //this.catalogosService.getCustomersMedium().then(data => this.customers1 = data);
    //this.catalogosService.getCustomersMedium().then(data => this.customers2 = data);

    this.registrosTabla();





  }



  openNew() {
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
        console.table(data2.datos.rows);
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


  buscar_codigo_ocupacion() {
    //alert("buscar_codigo_ocupacion");
    //this.codigo_ocupacion = '';
    this.descripcion_ocupacion = '';
    this.codigo_acteco = '';
    this.descripcion_acteco = '';
    this.usucre = '';
    this.feccre = '';
    this.usumod = '';
    this.fecmod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];

    // recorrer registros
    this.registros.forEach(element => {
      // El codigo debe ser igual al input codigo_ocupacion de izquierda a derecha, en caso de que el codigo_ocupacion sea null, no se debe mostrar
      if (element.codigo_ocupacion.startsWith(this.codigo_ocupacion)) {
        // agregar a registrosAux
        this.registrosAux.push(element);
      }
    });

    // ordenar por codigo registrosAux de menor tamaño de caracteres a mayor
    this.registrosAux.sort((a, b) => (a.codigo_ocupacion.length > b.codigo_ocupacion.length) ? 1 : -1);

  }



  buscar_descripcion_ocupacion() {
    this.codigo_ocupacion = '';
    //this.descripcion_ocupacion = '';
    this.codigo_acteco = '';
    this.descripcion_acteco = '';
    this.usucre = '';
    this.feccre = '';
    this.usumod = '';
    this.fecmod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];
  }


  buscar_codigo_acteco() {
    this.codigo_ocupacion = '';
    this.descripcion_ocupacion = '';
    //this.codigo_acteco = '';
    this.descripcion_acteco = '';
    this.usucre = '';
    this.feccre = '';
    this.usumod = '';
    this.fecmod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];

    // recorrer registros
    this.registros.forEach(element => {
      // El codigo debe ser igual al input codigo_ocupacion de izquierda a derecha, en caso de que el codigo_ocupacion sea null, no se debe mostrar
      if (element.codigo_acteco.startsWith(this.codigo_acteco)) {
        // agregar a registrosAux
        this.registrosAux.push(element);
      }
    });

    // ordenar por codigo registrosAux de menor tamaño de caracteres a mayor
    this.registrosAux.sort((a, b) => (a.codigo.length > b.codigo.length) ? 1 : -1);
  }


  buscar_descripcion_acteco() {
    this.codigo_ocupacion = '';
    this.descripcion_ocupacion = '';
    this.codigo_acteco = '';
    //this.descripcion_acteco = '';
    this.usucre = '';
    this.feccre = '';
    this.usumod = '';
    this.fecmod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];

  }


  buscar_usucre() {
    this.codigo_ocupacion = '';
    this.descripcion_ocupacion = '';
    this.codigo_acteco = '';
    this.descripcion_acteco = '';
    //this.usucre = '';
    this.feccre = '';
    this.usumod = '';
    this.fecmod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];
  }


  buscar_feccre() {
    this.codigo_ocupacion = '';
    this.descripcion_ocupacion = '';
    this.codigo_acteco = '';
    this.descripcion_acteco = '';
    this.usucre = '';
    //this.feccre = '';
    this.usumod = '';
    this.fecmod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];
  }


  buscar_usumod() {
    this.codigo_ocupacion = '';
    this.descripcion_ocupacion = '';
    this.codigo_acteco = '';
    this.descripcion_acteco = '';
    this.usucre = '';
    this.feccre = '';
    //this.usumod = '';
    this.fecmod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];
  }


  buscar_fecmod() {
    this.codigo_ocupacion = '';
    this.descripcion_ocupacion = '';
    this.codigo_acteco = '';
    this.descripcion_acteco = '';
    this.usucre = '';
    this.feccre = '';
    this.usumod = '';
    //this.fecmod = '';

    // Paginador
    this.first = 0;

    // Limpiar registrosAux
    this.registrosAux = [];
  }



  /* 
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
  */

  // FILTRO PERSONANALIZADO: de izquierda a derecha codigo_ocupacion
  filtrarIzquierdaADerechaCodOcup(evento: any) {
    // si el valor del input es vacío, entonces mostrar todos los registros
    if (!evento.target.value) { this.registros = this.registrosAux; return; }

    // el input para el codigo_acteco de busqueda debe estar vacío una vez que se haya ingresado un valor en el input de busqueda de codigo_ocupacion
    const codigoActecoInput = document.getElementById('codigo_acteco') as HTMLInputElement;
    codigoActecoInput.value = '';

    // Obtener el valor del input
    const valorBusqueda = evento.target.value;

    // tamaño de la cadena ingresada
    const tamanoCadena = valorBusqueda.length;

    console.log("tamanoCadena", tamanoCadena);

    // Buscar todos los registros con el tamaño de la cadena ingresada en el input de busqueda de codigo_ocupacion, y que coincidan con el valor ingresado en el input de busqueda de codigo_ocupacion
    this.registros = this.registrosAux.filter((item: any) => item.codigo_ocupacion.length === tamanoCadena && item.codigo_ocupacion.startsWith(valorBusqueda));


  }

  // FILTRO PERSONANALIZADO: de izquierda a derecha codigo_acteco
  filtrarIzquierdaADerechaCodActeco(evento: any) {
    // si el valor del input es vacío, entonces mostrar todos los registros
    if (!evento.target.value) { this.registros = this.registrosAux; return; }

    // el input para el codigo_ocupacion de busqueda debe estar vacío una vez que se haya ingresado un valor en el input de busqueda de codigo_acteco
    const codigoOcupacionInput = document.getElementById('codigo_ocupacion') as HTMLInputElement;
    codigoOcupacionInput.value = '';

    // Obtener el valor del input
    const valorBusqueda = evento.target.value;

    // tamaño de la cadena ingresada
    const tamanoCadena = valorBusqueda.length;

    // Buscar todos los registros con el tamaño de la cadena ingresada en el input de busqueda de codigo_acteco, y que coincidan con el valor ingresado en el input de busqueda de codigo_acteco
    this.registros = this.registrosAux.filter((item: any) => item.codigo_acteco.length === tamanoCadena && item.codigo_acteco.startsWith(valorBusqueda));
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
