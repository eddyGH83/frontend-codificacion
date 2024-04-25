import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ReporteService } from '../service/reporte.service';


interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-reporte12',
  templateUrl: './reporte12.component.html'
})
export class Reporte12Component implements OnInit {

  cities: City[];

  selectedCity: City;





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

    this.cities = [
      { name: 'cat_caeb', code: 'caeb' },
      { name: 'cat_cob', code: 'cob' },
      { name: 'cat_idioma', code: 'idioma' },
      { name: 'cat_npioc', code: 'npioc' },
      { name: 'cat_pais', code: 'pais' },
      { name: 'cat_municipio', code: 'municipio' }
    ];

    /* 
      { label: 'cat_caeb', icon: 'pi pi-map', routerLink: ['/reportes/reporte1'] },
      { label: 'cat_cob', icon: 'pi pi-map', routerLink: ['/reportes/reporte1'] },
      { label: 'cat_idioma', icon: 'pi pi-map', routerLink: ['/reportes/reporte1'] },
      { label: 'cat_npioc', icon: 'pi pi-map', routerLink: ['/reportes/reporte1'] },
      { label: 'cat_pais', icon: 'pi pi-map', routerLink: ['/reportes/reporte1'] },
      { label: 'cat_municipio', icon: 'pi pi-map', routerLink: ['/reportes/reporte1'] }
    */

    //this.selectedCity = { name: 'New York', code: 'NY' }

  }



  // Reporte
  reporteDatos() {
    this.progressBar.reporte_pb = true;
    this.reporteService.reporte1(this.busqueda).subscribe(
      (data2: any) => {
        //console.log("data2", data2);        
        this.progressBar.reporte_pb = false;
        this.registros = data2;
      })
  }

}
