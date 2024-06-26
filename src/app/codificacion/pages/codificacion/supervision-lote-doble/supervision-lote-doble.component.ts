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


  // Progress Bar
  tabla_pb: boolean = false;



  constructor(private router: Router, private codificacionService: CodificacionService, private messageService: MessageService) { }



  ngOnInit(): void {



    this.rows = [
      { nro: 50, value: 50 },
      { nro: 100, value: 100 },
      { nro: 1000, value: 1000 },
    ];
    this.selectedRow = { nro: 50, value: 50 };

    this.registrosTabla();

  }


  // 
  registrosTabla() {
    this.tabla_pb = true;
    this.codificacionService.devuelveCargaParaSupervision({ id_usuario: localStorage.getItem('id_usuario'), tabla_id: localStorage.getItem("tabla_id_sup") }).subscribe(
      (data2: any) => {
        // console.table(data2.datos);

        this.registros = data2.datos;
        this.tabla_pb = false;
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
    this.codificacionService.addItem({ id: 1, name: 'Recodificación', price: 10, category: 'Recodificación', review: 4, inventoryStatus: 'Out of Stock' });
    this.router.navigate(['/codificacion/supervision-individual-simple']);
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
