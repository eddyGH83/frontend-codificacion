import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CodificacionService } from '../service/codificacion.service';
import { Router } from '@angular/router';

import * as similarity from 'similarity';



@Component({
  selector: 'app-codificacion-simple',
  templateUrl: './codificacion-simple.component.html',
  styleUrls: ['./codificacion-simple.component.scss']
})
export class CodificacionSimpleComponent implements OnInit {

  // registros
  registros: any;
  registro: any;

  // Progress Bar
  tabla_pb: boolean = false;


  // Datos Carga
  carga: any;
  clasificacion: any;
  clasificacionAux: any;
  totalCarga: any;
  nroPreg: any;
  descPreg: any;

  // Un registro de la carga
  contexto: any;
  departamentoItem: any;
  idPregunta: any;
  secuencial: any;
  edad: any;
  respuestaItem: any;
  estadoItem: any;
  nAux: number = 0;
  porCodificar: number = 0;

  // Valores por defecto de los inputs de busqueda
  codigo: string = '';
  descripcion: string = '';

  // paginador
  first = 0;



  constructor(private router: Router, private messageService: MessageService, private codificacionService: CodificacionService, private confirmationService: ConfirmationService) { }



  ngOnInit(): void {
    // Verificamos que la variable tabla_id exista en localStorage
    if (localStorage.getItem('tabla_id') == null) {
      //Redireccionar a la página de codificación
      this.router.navigate(['/codificacion']);
    }


    // valores por defecto
    this.contexto = '';
    this.departamentoItem = '';
    this.idPregunta = '';
    this.secuencial = '';
    this.edad = '';
    this.respuestaItem = '';
    this.estadoItem = '';
    this.nAux = 0;
    this.porCodificar = 0;
    this.codigo = '';
    this.descripcion = '';
    this.clasificacionAux = [];

    // Cargar los registros para codificar (carga)
    this.cargarParaCodificar();
  }






  // carga para codificar
  cargarParaCodificar() {
    const body = {
      tabla_id: localStorage.getItem('tabla_id'),
      id_usuario: localStorage.getItem('id_usuario'),
      login: localStorage.getItem('login'),
    }
    this.codificacionService.cargarParaCodificarSimple(body).subscribe(
      (data2: any) => {
        this.carga = data2.datos;
        console.table(this.carga);

        this.clasificacion = data2.clasificacion;
        this.totalCarga = data2.totalCarga;
        this.nroPreg = data2.nroPreg;
        this.descPreg = data2.descPreg;
        this.porCodificar = data2.totalCarga;
        this.primero();
        this.buscarSimilares();
      })
  }





  // Buscar palabras similares en 
  buscarSimilares() {
    // Paginador
    this.first = 0;

    // limpiar clasificacionAux
    this.clasificacionAux = [];
    // recorrer clasificacion
    this.clasificacion.forEach(element => {
      // calcular la similitud           
      let sim = similarity(this.respuestaItem, element.descripcion);
      // si la similitud es mayor a 0.5
      if (sim > 0.5) {
        // agregar a clasificacionAux, tambien la similitud
        element.similitud = sim;
        this.clasificacionAux.push(element);
      }
    });
    // ordenar por similitud
    this.clasificacionAux.sort((a, b) => (a.similitud > b.similitud) ? -1 : 1);
  }







  // Buscar registros por el input codigo
  buscarSimilaresPorDescripcion() {
    // Paginador
    this.first = 0;

    // Limpiar clasificacionAux
    this.clasificacionAux = [];

    // Limpiar input descripcion
    this.codigo = '';

    // recorrer clasificacion
    this.clasificacion.forEach(element => {
      // La descripcion debe ser similar (debe buscar subcadenas) al input descripcion sin importar mayusculas, minusculas y aceentos
      if (element.descripcion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(this.descripcion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        // agregar a clasificacionAux
        this.clasificacionAux.push(element);
      }
      
      
    });

    // Ordenar el resultado de la busqueda por tamaño cadena de la descripcion
    this.clasificacionAux.sort((a, b) => (a.descripcion.length > b.descripcion.length) ? 1 : -1);





    // si el codigo no existe en la clasificacion limipar clasificacionAux
    if (this.descripcion.length === 0) {
      this.clasificacionAux = [];
    }

  }

  // Buscar registros por el input codigo
  buscarPorCodigo() {
    // Paginador
    this.first = 0;

    // Limpiar clasificacionAux
    this.clasificacionAux = [];

    // Limpiar input descripcion
    this.descripcion = '';

    // recorrer clasificacion
    this.clasificacion.forEach(element => {
      // El codigo debe ser igual al input codigo de izquierda a derecha, en caso de que el codigo sea null, no se debe mostrar
      if (element.codigo.startsWith(this.codigo)) {
        // agregar a clasificacionAux
        this.clasificacionAux.push(element);
      }
    });


    // order por codigo ORDER BY LENGTH(codigo), codigo ASCde mayor a menor
    // this.clasificacionAux.sort((a, b) => (a.codigo > b.codigo) ? -1 : 1);


    this.clasificacionAux.sort((a, b) => (a.codigo > b.codigo) ? 1 : -1);

    // si el codigo no existe en la clasificacion limipar clasificacionAux
    if (this.codigo.length === 0) {
      this.clasificacionAux = [];
    }

  }



  // recorre la carga al siguiente registro omitiendo los registros con estado CODIFICADO
  siguiente() {
    let i = this.nAux;
    while (i < this.totalCarga) {
      if (this.carga[i].estado === 'ASIGNADO') {
        this.contexto = this.carga[i].contexto;
        this.departamentoItem = this.carga[i].departamento;
        this.idPregunta = this.carga[i].id_pregunta;
        this.secuencial = this.carga[i].secuencial;
        this.edad = this.carga[i].edad;
        this.respuestaItem = this.carga[i].respuesta;
        this.estadoItem = this.carga[i].estado;
        this.nAux = i + 1;
        //  Reeplazar el input descripcion por el valor de la respuesta
        this.descripcion = this.respuestaItem;

        // Limpia el input codigo
        this.codigo = '';
        this.buscarSimilares();
        break;
      }
      i++;
    }
  }


  // primero de la carga
  primero_() {
    this.contexto = this.carga[0].contexto;
    this.departamentoItem = this.carga[0].departamento;
    this.idPregunta = this.carga[0].id_pregunta;
    this.secuencial = this.carga[0].secuencial;
    this.edad = this.carga[0].edad;
    this.respuestaItem = this.carga[0].respuesta;
    this.estadoItem = this.carga[0].estado;
    this.nAux = 1;
    //  Reeplazar el input descripcion por el valor de la respuesta
    this.descripcion = this.respuestaItem;
    // Limpia el input codigo
    this.codigo = '';
    this.buscarSimilares();
  }


  // Primero de la carga con estado ASIGNADO
  primero() {
    let i = 0;
    while (i < this.totalCarga) {
      if (this.carga[i].estado === 'ASIGNADO') {
        this.contexto = this.carga[i].contexto;
        this.departamentoItem = this.carga[i].departamento;
        this.idPregunta = this.carga[i].id_pregunta;
        this.secuencial = this.carga[i].secuencial;
        this.edad = this.carga[i].edad;
        this.respuestaItem = this.carga[i].respuesta;
        this.estadoItem = this.carga[i].estado;
        this.nAux = i + 1;
        //  Reeplazar el input descripcion por el valor de la respuesta
        this.descripcion = this.respuestaItem;

        // Limpia el input codigo
        this.codigo = '';
        this.buscarSimilares();
        break;
      }
      i++;
    }
  }



  // Recorre la carga hacia atras
  atras() {
    if (this.nAux > 1) {
      this.nAux = this.nAux - 2;
      this.contexto = this.carga[this.nAux].contexto;
      this.departamentoItem = this.carga[this.nAux].departamento;
      this.idPregunta = this.carga[this.nAux].id_pregunta;
      this.secuencial = this.carga[this.nAux].secuencial;
      this.edad = this.carga[this.nAux].edad;
      this.respuestaItem = this.carga[this.nAux].respuesta;
      this.estadoItem = this.carga[this.nAux].estado;
      this.nAux++;
    }
    //  Reeplazar el input descripcion por el valor de la respuesta
    this.descripcion = this.respuestaItem;

    // Limpia el input codigo
    this.codigo = '';
    this.buscarSimilares();
  }




  // Recorre la carga hacia adelante
  anularAnterior() {
    // Volver atras un registro
    this.atras();

    // sim y cuando sea mayor a 0 y que estado sea diferente de CODIFICADO
    if (this.porCodificar < this.totalCarga && this.estadoItem === 'CODIFICADO') {
      this.porCodificar++;
    }

    // Modificar el estado y
    this.estadoItem = 'ASIGNADO';

    // Modificar: carga (foreach) su propiedad estado_ocu = 'ASIGNADO'
    this.carga.forEach(element => {
      if (element.id_pregunta == this.idPregunta) {
        element.estado = 'ASIGNADO';
      }
    });

    // Recuperar informacion del registro
    const body = {
      id_registro: this.idPregunta,
      tabla_id: localStorage.getItem('tabla_id'),
    }

    this.codificacionService.updatePreguntaSimpleAnular(body).subscribe(
      (data2: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Anulación realizada' });
      })

  }



  confirmarCodifiacion(registro: any) {
    this.confirmationService.confirm({
      message: '<strong>Codigo: </strong>' + registro.codigo + '<br><strong>Descripción: </strong>' + registro.descripcion,
      header: 'Confirmación',
      icon: 'pi pi-check-square',
      accept: () => {

        // sim y cuando sea mayor a 0 y que estado sea diferente de CODIFICADO
        if (this.porCodificar > 0 && this.estadoItem === 'ASIGNADO') {
          this.porCodificar--;
        }

        // Modificar el estado y
        this.estadoItem = 'CODIFICADO';

        // Modificar: carga (foreach) su propiedad estado_ocu = 'CODIFICADO'
        this.carga.forEach(element => {
          if (element.id_pregunta == this.idPregunta) {
            element.estado = 'CODIFICADO';
          }
        });

        // Codificación
        const body = {
          id_registro: this.idPregunta,
          tabla_id: localStorage.getItem('tabla_id'),
          codigocodif: registro.codigo,
          usucodificador: localStorage.getItem('login'),
        }

        this.codificacionService.updatePreguntaSimple(body).subscribe(
          (data2: any) => {
            //
            if (data2.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: data2.message });
              // si por codificar es igual a 0, redireccionar a la página de /codificación
              if (this.porCodificar === 0) {
                this.router.navigate(['/codificacion']);
              }
              // paginador
              this.first = 0;              
              this.siguiente();
            } else {
              this.messageService.add({ severity: 'error', summary: 'error', detail: data2.message });
              this.ngOnInit();
            }
          })
      }
    });
  }


}
