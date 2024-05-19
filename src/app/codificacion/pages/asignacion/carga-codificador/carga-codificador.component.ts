import { Component, OnInit } from '@angular/core';
import { AsignacionService } from '../service/asignacion.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './carga-codificador.component.html',
  styleUrls: ['./carga-codificador.component.scss']
})
export class CargaCodificadorComponent implements OnInit {

  departamentos: any;
  selectedDepartamento: any;

  // selectedCustomer1: any;
  // registros: any;

  tabla_pb: boolean = false;
  asignacionDialog: boolean = false;


  registros: any;
  registro: any;

  usuarios: any;

  // check
  checkedTodo: boolean = false;
  checked: boolean = false;

  //
  array_asg: Array<any> = [];

  constructor(private asignacionService: AsignacionService) { }

  ngOnInit(): void {

    /* this.asignacion=[
      {check:false, nombre: "Juan Perez", cantidad: 2},
      {check:false, nombre: "Carla Ponce", cantidad: 2},
    ] */

    this.registrosTabla();

    this.departamentos = [
      { label: 'Chuquisaca', value: 'CHUQUISACA' },
      { label: 'La Paz', value: 'LA PAZ' },
      { label: 'Cochabamba', value: 'COCHABAMBA' },
      { label: 'Oruro', value: 'ORURO' },
      { label: 'Potosí', value: 'POTOSI' },
      { label: 'Tarija', value: 'TARIJA' },
      { label: 'Santa Cruz', value: 'SANTA CRUZ' },
      { label: 'Beni', value: 'BENI' },
      { label: 'Pando', value: 'PANDO' },
    ];

    this.selectedDepartamento = { label: 'La Paz', value: 'LA PAZ' };

    this.registros = []
  }

  registrosTabla() {

    this.asignacionService.preguntasPorDepartamentoCod().subscribe(res => {
      //alert("sdfsdf");
      this.registros = res.datos.rows;
      //this.registros = res;

      //console.log(res.datos.rows)
    });

  }

  seleccionarTodo() {
    if (this.checkedTodo !== false) {
      this.checkedTodo = true;
      for (let i = 0; i < this.usuarios.length; i++) {
        this.usuarios[i].activo = true;
      }
    } else {
      this.checkedTodo = false;
      for (let i = 0; i < this.usuarios.length; i++) {
        this.usuarios[i].activo = false;
      }
    }
  }

  asignarCarga(registro: any) {

    this.codificadores();

    this.registro = { ...registro };

    this.asignacionDialog = true;

  }

  codificadores() {
    //console.log("sdfsfsdfs");

    this.asignacionService.codificadores(localStorage.getItem('id_usuario')).subscribe(res => {
      this.usuarios = res.datos.rows;
      this.checkedTodo = false;

      // llenamos de ceros
      /* for (let i in this.usuarios) {
        this.usuarios[i].total = 0;
        this.usuarios[i].activo = false;
      } */

      //console.table(this.usuarios);

      /*  console.log(this.usuarios)
       this.total=this.codificacionService.count;
       const total = this.usuarios.length;
       this.marcatodo = false
       this.msg = "Seleccionar todo"
       this.msg125 = this.codificacionService.id == 125 ? "Asignación simultanea, cada asignación cuenta el doble" : ""
       for (let i in this.usuarios) {
           this.usuarios[i].total = 0;
           this.usuarios[i].activo = false;
       }
       console.log(this.usuarios)
       console.log(this.codificacionService.id)
   }) */
    });
  }


  guardar() {
    //alert(this.registro.nro_preg);
    this.array_asg = [];

    for (let j in this.usuarios) {
      if (this.usuarios[j].total > 0) {
        const body = {
          departamento: 'DEPTO AQUI', //this.codificacionService.depto,
          count: this.usuarios[j].total,
          estado: 'ASIGNADO',
          usucre: this.usuarios[j].login,
          area: 'AREA AQUI' // this.codificacionService.area1
        }
        this.array_asg.push(body)
      }
    }
    // imprimir los registros de array_asg
    console.table(this.array_asg);
    
    

    //alert("Asignado correctamente");

    this.asignacionService.updateAsignado(this.registro.tabla_id, this.array_asg).subscribe(res => {
      this.asignacionDialog = false;
      this.registrosTabla();
    });

  }



  /*  this.asignacionService.updateAsignado('49-51', this.array_asg).subscribe( res => {
      this.asignacionDialog = false;
      this.registrosTabla();       
    }, error=> console.error(error)) */



}
