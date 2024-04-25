import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ReporteService } from '../service/reporte.service';

@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html'
})
export class Reporte2Component implements OnInit {

  items: any;

  // Datos de la tabla
  registros: any;

  // Busqueda
  busqueda: any;

  // ProgresBar
  progressBar: any = {
    reporte_pb: false
  };

  constructor(private router: Router, private reporteService: ReporteService) { }

  ngOnInit(): void {

    this.items = [
      { label: 'cat_caeb', icon: 'pi pi-map', routerLink: ['/reportes/reporte1'] },
      { label: 'cat_cob', icon: 'pi pi-map', routerLink: ['/reportes/reporte1'] },
      { label: 'cat_idioma', icon: 'pi pi-map', routerLink: ['/reportes/reporte1'] },
      { label: 'cat_npioc', icon: 'pi pi-map', routerLink: ['/reportes/reporte1'] },
      { label: 'cat_pais', icon: 'pi pi-map', routerLink: ['/reportes/reporte1'] },
      { label: 'cat_municipio', icon: 'pi pi-map', routerLink: ['/reportes/reporte1'] }
    ];
    this.reporteDatos();
  }
  
  // Reporte
  reporteDatos() {
    this.progressBar.reporte_pb = true;
    this.reporteService.reporte2(this.busqueda).subscribe(
      (data2: any) => {
        this.progressBar.reporte_pb = false;
        this.registros = data2;
      })
  }

}
