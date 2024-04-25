import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ReporteService } from '../service/reporte.service';

@Component({
  selector: 'app-reporte6',
  templateUrl: './reporte6.component.html'
})
export class Reporte6Component implements OnInit {


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
    this.reporteService.reporte6(this.busqueda).subscribe(
      (data2: any) => {
        //console.log("data2", data2);        
        this.progressBar.reporte_pb = false;
        this.registros = data2;
      })
  }

}
