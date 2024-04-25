import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ReporteService } from '../service/reporte.service';





@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html'
})
export class Reporte1Component implements OnInit {

  items: any;

  // Datos de la tabla
  registros: any;

  // Busqueda
  busqueda: any;

  catalogos: any;
  selectedCatalogo: any;

  // ProgresBar
  progressBar: any = {
    reporte1_pb: false
  };

  constructor(private router: Router, private reporteService: ReporteService) { }

  ngOnInit(): void {

  
    this.reporte();


    this.catalogos = [
      { label: 'cat_caeb', value: 'cat_caeb' },
      { label: 'cat_cob', value: 'cat_cob' },
      { label: 'cat_idioma', value: 'cat_idioma' },
      { label: 'cat_npioc', value: 'cat_npioc' },
      { label: 'cat_pais', value: 'cat_pais' },
      { label: 'cat_municipio', value: 'cat_municipio' }
    ];

    this.selectedCatalogo = { label: 'cat_caeb', value: 'cat_caeb'  };


  }
  
  // Reporte
  reporte() {
    this.progressBar.reporte_pb = true;
    this.reporteService.reporte1(this.busqueda).subscribe(
      (data2: any) => {
        this.progressBar.reporte_pb = false;
        this.registros = data2;
      })
  }

}
