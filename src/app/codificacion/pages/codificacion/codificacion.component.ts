import { Component, OnInit } from '@angular/core';
import { CodificacionService } from './service/codificacion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-codificacion',
  templateUrl: './codificacion.component.html',
  styleUrls: ['./codificacion.component.scss']
})
export class CodificacionComponent implements OnInit {
  // registros
  registros: any;
  registro: any;


  // Cities
  departamento: any;
  selectedDepartamento: any;


  // Progress Bar
  tabla_pb: boolean = false;

  constructor(private codificacionService: CodificacionService, private router: Router) { }


  ngOnInit(): void {

    // Eliminar tabla_id de localStorage
    localStorage.removeItem('tabla_id');


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
      depto: 'CHUQUISACA', codigo: '01' 
    };

    localStorage.setItem('carga_depto', this.selectedDepartamento.depto);

    this.registrosTabla();
  }







  // Tabla de preguntas
  registrosTabla() {
    this.tabla_pb = true;
    this.codificacionService.devuelvePreguntasCodificado({ 
      usucre: localStorage.getItem('login'),
      departamento: this.selectedDepartamento.depto
    }).subscribe(
      (data2: any) => {
        this.tabla_pb = false;
        this.registros = data2.datos.rows;
        localStorage.setItem('carga_depto', this.selectedDepartamento.depto);

      })
  }


  codificacionSimple(rg: any) {
    // Redireccionar a la página de codificación simple
    this.router.navigate(['/codificacion/codificacion-simple']);

    // Guardar tabla_id en localStorage 
    localStorage.setItem('tabla_id', rg.tabla_id);
  }

  codificacionDoble(rg: any) {
    // Redireccionar a la página de codificación doble
    this.router.navigate(['/codificacion/codificacion-doble']);

    // Guardar tabla_id en localStorage
    localStorage.setItem('tabla_id', rg.tabla_id);

  }

}
