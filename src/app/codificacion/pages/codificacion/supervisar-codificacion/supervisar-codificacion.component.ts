import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CodificacionService } from '../service/codificacion.service';

@Component({
  selector: 'app-supervisar-codificacion',
  templateUrl: './supervisar-codificacion.component.html',
  styleUrls: ['./supervisar-codificacion.component.scss']
})
export class SupervisarCodificacionComponent implements OnInit {

  // registros
  registros: any;
  registro: any;

    // Cities
    departamento: any;
    selectedDepartamento: any;


  // Progress Bar
  tabla_pb: boolean = false;


  constructor(private router: Router, private messageService: MessageService, private codificacionService: CodificacionService, private confirmationService: ConfirmationService) { }


  ngOnInit(): void {

    this.departamento = [
      { depto: 'CHUQUISACA', codigo: '01' },
      { depto: 'LA PAZ', codigo: '02' },
      { depto: 'COCHABAMBA', codigo: '03' },
      { depto: 'ORURO', codigo: '04' },
      { depto: 'POTOSI', codigo: '05' },
      { depto: 'TARIJA', codigo: '06' },
      { depto: 'SANTA CRUZ', codigo: '07' },
      { depto: 'BENI', codigo: '08' },
      { depto: 'PANDO', codigo: '09' }
    ];

    this.selectedDepartamento = {
      depto: 'ORURO', codigo: '04'
    };

    localStorage.setItem('carga_depto_sup', this.selectedDepartamento.depto);


    this.registrosTabla();

  }


  // Tabla de preguntas
  registrosTabla() {
    this.tabla_pb = true;
    this.codificacionService.devuelvePreguntasSupervision({ 
      id_usuario: localStorage.getItem('id_usuario'), 
      departamento : this.selectedDepartamento.depto
    }).subscribe(
      (data2: any) => {
        console.table(data2.datos);
        this.registros = data2.datos;
        this.tabla_pb = false;
        localStorage.setItem('carga_depto_sup', this.selectedDepartamento.depto);
      })
  }

  // POR LOTES
  supervisionPorLoteSimple(rg: any) {
    // Redireccionar a la página de codificación simple
    this.router.navigate(['/codificacion/supervision-lotes-simple']);
    // Guardar tabla_id en localStorage 
    localStorage.setItem('tabla_id_sup', rg.tabla_id);
  }
  supervisionPorLoteDoble(rg: any) {
    // Redireccionar a la página de codificación doble
    this.router.navigate(['/codificacion/supervision-lotes-doble']);
    // Guardar tabla_id en localStorage
    localStorage.setItem('tabla_id_sup', rg.tabla_id);
  }

  // INDIVIDUAL
  supervisionIndividualSimple(rg: any) {
    // Redireccionar a la página de codificación simple
    this.router.navigate(['/codificacion/supervision-individual-simple']);
    // Guardar tabla_id en localStorage 
    localStorage.setItem('tabla_id_sup', rg.tabla_id);
  }
  supervisionIndividualDoble(rg: any) {
    // Redireccionar a la página de codificación doble
    this.router.navigate(['/codificacion/supervision-individual-doble']);
    // Guardar tabla_id en localStorage
    localStorage.setItem('tabla_id_sup', rg.tabla_id);
  }


  // RECODIFICACION



}
