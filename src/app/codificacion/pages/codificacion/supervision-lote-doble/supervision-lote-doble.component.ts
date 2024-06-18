import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodificacionService } from '../service/codificacion.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-supervision-lote-doble',
  templateUrl: './supervision-lote-doble.component.html',
  styleUrls: ['./supervision-lote-doble.component.scss']
})
export class SupervisionLoteDobleComponent implements OnInit {



  registros: any;
  registro: any;
  selectedRegistros: any;



  // paginador
  rows: any;
  selectedRow: any;

  // Cantidad de registros seleccionados
  nroRegSelected: number = 0;



  // Dialog
  confirmacionDialog: boolean = false;
  confirmacionDialogError: boolean = false;



  constructor(private router: Router, private codificacionService: CodificacionService, private messageService: MessageService) { }



  ngOnInit(): void {



    this.rows = [
      { nro: 10, value: 10 },
      { nro: 50, value: 50 },
      { nro: 100, value: 100 },
      { nro: 200, value: 200 },
      { nro: 500, value: 500 },
    ];
    this.selectedRow = { nro: 10, value: 10 };

    this.registrosTabla();

  }



  // 
  registrosTabla() {
    this.codificacionService.devuelveCargaParaSupervision({ id_usuario: localStorage.getItem('id_usuario'), tabla_id: localStorage.getItem("tabla_id_sup") }).subscribe(
      (data2: any) => {
        console.table(data2.datos);

        //this.tabla_pb = false;
        this.registros = data2.datos;
      })

  }




  hideDialog() {
    this.confirmacionDialog = false;
  }

  hideDialogError() {
    this.confirmacionDialogError = false;
  }


  guardarSupervision() {
    // calcular el total de registros seleccionados si es undefined o null 
    if (this.selectedRegistros === undefined || this.selectedRegistros === null || this.selectedRegistros.length === 0) {
      this.nroRegSelected = 0;
      this.confirmacionDialogError = true;
    } else {
      this.nroRegSelected = this.selectedRegistros.length;
      this.confirmacionDialog = true;
    }

  }

  recodificaicion() { 
    alert('Recodificación');
  }


  // Confirmar la supervisión
  confirmaSupervision() {
    this.codificacionService.updateCargaSupervision(
      {
        id_usuario: localStorage.getItem('login'),
        tabla_id: localStorage.getItem("tabla_id_sup"),
        registros: this.selectedRegistros
      }
    ).subscribe(
      (data2: any) => {
        this.confirmacionDialog = false;
        this.registrosTabla();
        this.messageService.add({ severity: 'success', summary: 'Mensaje:', detail: data2.message, life: 2500 });

        //this.tabla_pb = false;
        //this.registros = data2.datos;
      })
  }


  // 
  cancelarYsalir() {
    this.router.navigate(['/codificacion/supervisar-codificacion']);
  }


}
