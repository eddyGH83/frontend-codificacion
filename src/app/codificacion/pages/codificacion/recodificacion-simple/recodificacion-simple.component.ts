import { Component, OnInit } from '@angular/core';
import { CodificacionService } from '../service/codificacion.service';
// importar router
import { Router } from '@angular/router';

@Component({
  selector: 'app-recodificacion-simple',
  templateUrl: './recodificacion-simple.component.html',
  styleUrls: ['./recodificacion-simple.component.scss']
})
export class RecodificacionSimpleComponent implements OnInit {

  datos: any;

  
  constructor(private codificacionService: CodificacionService, private router:Router) {}

  ngOnInit(): void {

    // Verificamos si hay id_registros en el servicio, si no hay redireccionamos a la página /codificacion/supervision-lotes-simple
    if(this.codificacionService.getItem().length==0){      
      this.router.navigate(['/codificacion/supervision-lotes-simple']);
    }else{
      this.datos=this.codificacionService.getItem();
      console.table(this.datos);
    }    
  }

}
