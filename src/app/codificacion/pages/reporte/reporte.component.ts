import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  // localstorage
  rol_id: number;

  // reportes
  rep01: boolean = false;
  rep02: boolean = false;
  rep03: boolean = false;
  rep04: boolean = false;
  rep05: boolean = false;
  rep06: boolean = false;
  rep07: boolean = false;
  rep08: boolean = false;
  rep09: boolean = false;
  rep10: boolean = false;
  rep11: boolean = false;
  rep12: boolean = false;
  rep13: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.rol_id = Number(localStorage.getItem('rol_id'));

    // Reportes que debe ver el usuario SuperAdmin
    if (this.rol_id === 1) {
      this.rep01 = true;
      this.rep02 = true;
      this.rep03 = true;
      this.rep04 = true;
      this.rep05 = true;
      this.rep06 = true;
      this.rep07 = true;
      this.rep08 = true;
      this.rep09 = true;
      this.rep10 = true;
      this.rep11 = true;
      this.rep12 = true;
      this.rep13 = true;
    }
    // Reportes que debe ver el usuario Responsable especialista
    if (this.rol_id === 2) {
      this.rep01 = true;
      this.rep02 = true;
      this.rep03 = true;
      this.rep04 = true;
      this.rep05 = true;
      this.rep06 = true;
      this.rep07 = true;
      this.rep08 = true;
      this.rep09 = true;
      this.rep10 = true;
      this.rep11 = true;
      this.rep12 = true;
      this.rep13 = true;
    }
    // Reportes que debe ver el usuario Jefe de turno
    if (this.rol_id === 3) {
      this.rep01 = true;
      this.rep02 = true;
      this.rep03 = true;
      this.rep04 = true;
      this.rep05 = true;
      this.rep06 = true;
      this.rep07 = true;
      this.rep08 = true;
      this.rep09 = true;
      this.rep10 = true;
      this.rep11 = true;
      this.rep12 = true;
      this.rep13 = true;
    }
    // Reportes que debe ver el usuario Supervisor de codificación
    if (this.rol_id === 4) {
      this.rep01 = false;
      this.rep02 = false;
      this.rep03 = false;
      this.rep04 = false;
      this.rep05 = false;
      this.rep06 = true;
      this.rep07 = true;
      this.rep08 = true;
      this.rep09 = false;
      this.rep10 = false;
      this.rep11 = false;
      this.rep12 = false;
      this.rep13 = false;
    }
    // Reportes que debe ver el usuario Técnico de codificación
    if (this.rol_id === 5) {
      this.rep01 = false;
      this.rep02 = false;
      this.rep03 = false;
      this.rep04 = false;
      this.rep05 = false;
      this.rep06 = false;
      this.rep07 = false;
      this.rep08 = false;
      this.rep09 = false;
      this.rep10 = false;
      this.rep11 = false;
      this.rep12 = false;
      this.rep13 = false;
    }
    // Reportes que debe ver el usuario Tecnico de contingencia
    if (this.rol_id === 6) {
      this.rep01 = false;
      this.rep02 = false;
      this.rep03 = false;
      this.rep04 = false;
      this.rep05 = false;
      this.rep06 = false;
      this.rep07 = false;
      this.rep08 = false;
      this.rep09 = false;
      this.rep10 = false;
      this.rep11 = false;
      this.rep12 = false;
      this.rep13 = false;
    }

  }

}
