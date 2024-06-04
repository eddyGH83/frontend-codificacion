import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CodificacionService } from '../service/codificacion.service';
import { Router } from '@angular/router';

import * as similarity from 'similarity';



@Component({
  selector: 'app-codificacion-simple',
  templateUrl: './codificacion-simple.component.html',
  styleUrls: ['./codificacion-simple.component.scss']
})
export class CodificacionSimpleComponent implements OnInit {

  // registros
  registros: any;
  registro: any;

  // Progress Bar
  tabla_pb: boolean = false;


  // Datos Carga
  carga: any;
  clasificacion: any;
  totalCarga: any;
  nroPreg: any;
  descPreg: any;

  // Un registro de la carga
  contexto: any;
  departamentoItem: any;
  idPregunta: any;
  secuencial: any;
  respuestaItem: any;
  estadoItem: any;
  nAux: number = 0;
  porCodificar: number = 0;



  constructor(private router: Router, private messageService: MessageService, private codificacionService: CodificacionService, private confirmationService: ConfirmationService) { }


  ngOnInit(): void {

    // Verificamos que la variable tabla_id exista en localStorage
    if (localStorage.getItem('tabla_id') == null) {
      //Redireccionar a la página de codificación
      this.router.navigate(['/codificacion']);
    }

    this.cargarParaCodificar();
  }


  // carga para codificar
  cargarParaCodificar() {
    const body = {
      tabla_id: localStorage.getItem('tabla_id'),
      id_usuario: localStorage.getItem('id_usuario'),
      login: localStorage.getItem('login'),
    }

    this.codificacionService.cargarParaCodificarSimple(body).subscribe(
      (data2: any) => {
        this.carga = data2.datos;
        this.clasificacion = data2.clasificacion;
        this.totalCarga = data2.totalCarga;
        this.nroPreg = data2.nroPreg;
        this.descPreg = data2.descPreg;
        this.porCodificar = data2.totalCarga;
        console.table(this.carga);

        this.primero();
      })

  }

  // recorre la carga
  siguiente() {
    if (this.nAux < this.totalCarga) {
      this.contexto = this.carga[this.nAux].contexto;
      this.departamentoItem = this.carga[this.nAux].departamento;
      this.idPregunta = this.carga[this.nAux].id_pregunta;
      this.secuencial = this.carga[this.nAux].secuencial;
      this.respuestaItem = this.carga[this.nAux].respuesta;
      this.estadoItem = this.carga[this.nAux].estado;
      this.nAux++;
    }
  }

  // primero de la carga
  primero() {
    this.contexto = this.carga[0].contexto;
    this.departamentoItem = this.carga[0].departamento;
    this.idPregunta = this.carga[0].id_pregunta;
    this.secuencial = this.carga[0].secuencial;
    this.respuestaItem = this.carga[0].respuesta;
    this.estadoItem = this.carga[0].estado;
    this.nAux = 1;
  }

  // recorre la carga hacia atras
  atras() {
    if (this.nAux > 1) {
      this.nAux = this.nAux - 2;
      this.contexto = this.carga[this.nAux].contexto;
      this.departamentoItem = this.carga[this.nAux].departamento;
      this.idPregunta = this.carga[this.nAux].id_pregunta;
      this.secuencial = this.carga[this.nAux].secuencial;
      this.respuestaItem = this.carga[this.nAux].respuesta;
      this.estadoItem = this.carga[this.nAux].estado;
      this.nAux++;
    }
  }

  // recorre la carga hacia adelante
  anularAnterior(){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Anulación realizada' });
    this.atras();
  }



  confirmarCodifiacion(registro: any) {
    this.confirmationService.confirm({
      message: '<strong>Codigo: </strong>' + registro.codigo + '<br><strong>Descripción: </strong>' + registro.descripcion,
      header: 'Confirmación',
      icon: 'pi pi-check-square',
      accept: () => {

        // siem y cuando sea mayor a 0 y que estado sea diferente de CODIFICADO
        if (this.porCodificar > 0 && this.estadoItem === 'ASIGNADO') {
          this.porCodificar--;
        }

        // Modificar el estado y
        this.estadoItem = 'CODIFICADO';

        // Modificar: carga (foreach) su propiedad estado_ocu = 'CODIFICADO'
        this.carga.forEach(element => {
          if (element.id_pregunta == this.idPregunta) {
            element.estado = 'CODIFICADO';
          }
        });

        this.siguiente();

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Codificación realizada' });
      }
    });
  }

}
