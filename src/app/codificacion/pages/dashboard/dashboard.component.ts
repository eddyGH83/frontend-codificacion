import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  infoRapida: boolean= false;

  value8: number = 60;

  constructor() { }

  ngOnInit(): void {
    this.tipoUsuario();
  }

  tipoUsuario() {
    if (localStorage.getItem('rol_id') === '3' || localStorage.getItem('rol_id') === '5') {
      this.infoRapida = true;
    }else{
      this.infoRapida = false;
    }

  }
}
