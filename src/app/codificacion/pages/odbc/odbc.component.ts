// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OdbcService } from './service/odbc.service';

import * as moment from 'moment';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-odbc',
  templateUrl: './odbc.component.html'
})
export class OdbcComponent implements OnInit {


  rangeDates: Date[];

  minDate: Date;

  maxDate: Date;

  es: any;

  invalidDates: Array<Date>



  // ----------- Para la subida de archivos 
  @ViewChild('fileInput') fileInput: ElementRef;
  rangeDates_oa: Date[];
  rangeDates_ug: Date[];
  rangeDates_npioc: Date[];
  fechaInicial: Date;
  fechaFinal: Date; datos: any;
  encabezados: any;
  uploadedFiles: Array<File> = [];
  loading: boolean;
  ntabla: String;



  constructor(private messageService: MessageService, private odbcService: OdbcService) { }

  ngOnInit(): void {

    /*  this.es = {
       firstDayOfWeek: 1,
       dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
       dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
       dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
       monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
       monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
       today: 'Hoy',
       clear: 'Borrar'
     } */
    /* 
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month - 1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear); */

    /*   let invalidDate = new Date();
      invalidDate.setDate(today.getDate() - 1);
      this.invalidDates = [today, invalidDate];
   */

  }


  clearFileInput() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }


  cargaOdbc_npioc() {

    //let user = localStorage.getItem('login')

    this.loading = true
    console.log('Upload')
    let formData = new FormData();
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    console.log(formData)
    let login = localStorage.getItem('login')
    this.odbcService.subirOdbc_npioc(formData, login).subscribe((res) => {
      console.log('Response: ', res);
      /* Swal.fire({
        icon: 'success',
        title: 'Registros Cargados Correctamente!!. ',
      }) */
      this.loading = false

    })
    this.clearFileInput();

  }




  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  fechaSeleccionada() {
    console.log("sdsdfsdf");
  }


  decargaOdbc_npioc() {
    this.ntabla = 'ArchivoODBC_npioc'
    // Verifica si se han seleccionado las fechas
    if (this.rangeDates_npioc && this.rangeDates_npioc.length === 2) {
      // Obtiene las fechas seleccionadas
      console.log(this.rangeDates_npioc)
      this.loading = true
      this.odbcService.repOdbc_npioc(moment(this.rangeDates_npioc[0]).format("DD-MM-YYYY"), moment(this.rangeDates_npioc[1]).format("DD-MM-YYYY")).subscribe(res => {
        this.datos = res.datos.rows;
        this.encabezados = res.datos.fields

        console.log(this.encabezados)
        this.exportExcel()

        /* Swal.fire({
          icon: 'success',
          title: 'Archivo exportado!!. ',
        }) */
        this.loading = false

      })
    } else {
      // Si no se han seleccionado fechas, muestra un mensaje de error o realiza alguna otra acción
      console.log('Por favor, seleccione un rango de fechas válido.');
    }
  }

  decargaOdbc_migracion() {
    this.ntabla = 'ArchivoODBC_migracion'
    // Verifica si se han seleccionado las fechas
    if (this.rangeDates_ug && this.rangeDates_ug.length === 2) {
      // Obtiene las fechas seleccionadas
      console.log(this.rangeDates_ug)
      this.loading = true
      this.odbcService.repOdbc_migracion(moment(this.rangeDates_ug[0]).format("DD-MM-YYYY"), moment(this.rangeDates_ug[1]).format("DD-MM-YYYY")).subscribe(res => {
        this.datos = res.datos.rows;
        this.encabezados = res.datos.fields

        console.log(this.encabezados)
        this.exportExcel()

        /* Swal.fire({
          icon: 'success',
          title: 'Archivo exportado!!. ',
        }) */
        this.loading = false

      })
    } else {
      // Si no se han seleccionado fechas, muestra un mensaje de error o realiza alguna otra acción
      console.log('Por favor, seleccione un rango de fechas válido.');
    }
  }

  decargaOdbc() {
    this.ntabla = 'ArchivoODBC_ocup_activ'
    // Verifica si se han seleccionado las fechas
    if (this.rangeDates_oa && this.rangeDates_oa.length === 2) {
      // Obtiene las fechas seleccionadas
      console.log(this.rangeDates_oa)
      this.loading = true
      this.odbcService.repOdbc(moment(this.rangeDates_oa[0]).format("DD-MM-YYYY"), moment(this.rangeDates_oa[1]).format("DD-MM-YYYY")).subscribe(res => {
        this.datos = res.datos.rows;
        this.encabezados = res.datos.fields

        console.log(this.encabezados)
        this.exportExcel()

        /* Swal.fire({
          icon: 'success',
          title: 'Archivo exportado!!. ',
        }) */
        this.loading = false

      })
    } else {
      // Si no se han seleccionado fechas, muestra un mensaje de error o realiza alguna otra acción
      console.log('Por favor, seleccione un rango de fechas válido.');
    }
  }

  exportExcel() {
    let variable: Array<any> = [];
    import("xlsx").then(xlsx => {
      this.datos.forEach((element) => {
        const datos = element
        variable.push(datos)
      });
      const worksheet = xlsx.utils.json_to_sheet(variable);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "dataODBC");
    });
  }
  /**
   * 
   * @param buffer 
   * @param fileName 
   */
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    //FileSaver.saveAs(data, 'ArchivoODBC'+EXCEL_EXTENSION);
    FileSaver.saveAs(data, this.ntabla + EXCEL_EXTENSION);
  }




  /*     // exportar a excel 
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
      } */



}
