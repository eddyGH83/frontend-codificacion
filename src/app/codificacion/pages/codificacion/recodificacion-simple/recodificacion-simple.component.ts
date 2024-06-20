import { Component, OnInit } from '@angular/core';
import { CodificacionService } from '../service/codificacion.service';

@Component({
  selector: 'app-recodificacion-simple',
  templateUrl: './recodificacion-simple.component.html',
  styleUrls: ['./recodificacion-simple.component.scss']
})
export class RecodificacionSimpleComponent implements OnInit {

  datos: any;

  constructor(private codificacionService: CodificacionService) {}

  ngOnInit(): void {
    console.log('Recodificación Simple-------------------');
    
    this.datos=this.codificacionService.getItem();
    console.table(this.datos);
  }

}
