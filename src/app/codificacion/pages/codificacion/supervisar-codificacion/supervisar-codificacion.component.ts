import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

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


  constructor(private messageService: MessageService, private codificacionService: CodificacionService, private confirmationService: ConfirmationService) { }


  ngOnInit(): void {

    this.registros = [
      {
        nroPreg: "20",
        variable: "Alguna persona que vivía con usted(es) en este hogar, ¿actualmente vive en otro país?",
        totalCod: 1,
        totalAut:2

      },
      {
        nroPreg: "32",
        variable: "¿Se autoidentifica con alguna nación, pueblo indígena originario campesino o afroboliviano?",
        totalCod: 1,
        totalAut:2
      },
      {
        nroPreg: "33",
        variable: "Idioma 1",
        totalCod: 0,
        totalAut:0
      },
      {
        nroPreg: "33",
        variable: "Idioma 2",
        totalCod: 1,
        totalAut:2
      },
      {
        nroPreg: "33",
        variable: "Idioma 3",
        totalCod: 1,
        totalAut:2
      },
      {
        nroPreg: "34",
        variable: "¿Cuál es el primer idioma o lengua en el que aprendió a hablar en su niñez?",
        totalCod: 1,
        totalAut:2
      },
      {
        nroPreg: "35",
        variable: "¿Dónde nació?",
        totalCod: 0,
        totalAut: 0
      },
      {
        nroPreg: "36",
        variable: "¿Dónde vive habitualmente?",
        totalCod: 1,
        totalAut:2
      },
      {
        nroPreg: "37",
        variable: "¿Dónde vivía el año 2019?",
        totalCod: 1,
        totalAut:2
      },
      {
        nroPreg: "48",
        variable: "Las últimas 4 semanas:",
        totalCod: 1,
        totalAut:2
      },
      {
        nroPreg: "49-51",
        variable: "Ocupación - Actividad Económica",
        totalCod: 1,
        totalAut:2
      },
      {
        nroPreg: "52",
        variable: "Principalmente, el lugar donde trabaja está ubicado:",
        totalCod: 1,
        totalAut:2
      },
    ];

  }


}
