import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CodificacionService } from '../service/codificacion.service';


@Component({
  selector: 'app-supervisar-codificacion-automatica',
  templateUrl: './supervisar-codificacion-automatica.component.html',
  styleUrls: ['./supervisar-codificacion-automatica.component.scss']
})
export class SupervisarCodificacionAutomaticaComponent implements OnInit {

  // registros
  registros: any;
  registro: any;


  // Progress Bar
  tabla_pb: boolean = false;


  constructor(private router: Router, private messageService: MessageService, private codificacionService: CodificacionService, private confirmationService: ConfirmationService) { }


  ngOnInit(): void {

    this.registrosTabla();

  }


  // Tabla de preguntas
  registrosTabla() {
    this.tabla_pb = true;
    this.codificacionService.devuelvePreguntasSupervisionAutomatica({ 
      id_usuario: localStorage.getItem('id_usuario'),
      login: localStorage.getItem('login') 
    }).subscribe(
      (data2: any) => {
        //console.table(data2.datos);
        this.registros = data2.datos;
        this.tabla_pb = false;
      })
  }

  // POR LOTES
  supervisionPorLoteSimple(rg: any) {
    // Redireccionar a la página de codificación simple
    this.router.navigate(['/codificacion/supervision-lotes-simple-automatica']);
    // Guardar tabla_id en localStorage 
    localStorage.setItem('tabla_id_sup', rg.tabla_id);
  }
  supervisionPorLoteDoble(rg: any) {
    // Redireccionar a la página de codificación doble
    this.router.navigate(['/codificacion/supervision-lotes-doble-automatica']);
    // Guardar tabla_id en localStorage
    localStorage.setItem('tabla_id_sup', rg.tabla_id);
  }

/*   // INDIVIDUAL
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
  } */


  // RECODIFICACION



}
