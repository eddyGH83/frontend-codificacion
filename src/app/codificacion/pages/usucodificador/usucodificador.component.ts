import { Component, OnInit } from '@angular/core';


interface Product {
  variable: string;
  total: number;
}


@Component({
  selector: 'app-usucodificador',
  templateUrl: './usucodificador.component.html'
})
export class UsucodificadorComponent implements OnInit {

  products: Product[];



  /* 
  20
32
33


34
35

36

37

49 y 51 (antes 48 y 50)






52 (antes 51)

48

  */

  constructor() { }

  ngOnInit(): void {

    this.products = [
      {
        variable: 'Pregunta 35: Municipio donde nació',
        total: 78
      },
      {
        variable: 'Pregunta 20: Persona 1',
        total: 7
      },
      {
        variable: 'Preguntas 48-50: Ocupación - Actividad Económica',
        total: 75
      }
    ]
  }

}
